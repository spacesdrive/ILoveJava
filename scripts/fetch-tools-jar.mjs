#!/usr/bin/env node
// Downloads tools.jar (the javac compiler, packaged as its own JAR - a Java 8
// concept; 9+ modularized it away) from a real Eclipse Temurin 8 build via
// Adoptium's API, so it can be served from public/ and used as CheerpJ's
// compile-time classpath (see src/engines/playground-engine/wasm-jvm - ADR 0003).
//
// tools.jar itself is a small slice of a much larger JDK archive, so this
// downloads the full tar.gz to a temp file, extracts just that one entry, and
// discards the rest. Runs as a postinstall script; idempotent - skips the
// download if public/tools.jar already exists. Never fails `pnpm install` -
// a missing tools.jar just means the exercise playground reports compilation
// as unavailable until this script is re-run with network access.
import { execFileSync } from 'node:child_process'
import { existsSync, globSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { copyFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')
const DEST = path.join(PROJECT_ROOT, 'public', 'tools.jar')

const ADOPTIUM_URL =
  'https://api.adoptium.net/v3/binary/latest/8/ga/linux/x64/jdk/hotspot/normal/eclipse'

async function main() {
  if (existsSync(DEST)) {
    console.log(
      '[fetch-tools-jar] public/tools.jar already present, skipping download.',
    )
    return
  }

  const tempDir = mkdtempSync(path.join(tmpdir(), 'ilovejava-jdk-'))
  const archivePath = path.join(tempDir, 'jdk.tar.gz')

  try {
    console.log('[fetch-tools-jar] Downloading Eclipse Temurin 8 (for tools.jar)...')
    const response = await fetch(ADOPTIUM_URL, { redirect: 'follow' })
    if (!response.ok) {
      throw new Error(`Download failed: ${response.status} ${response.statusText}`)
    }
    writeFileSync(archivePath, Buffer.from(await response.arrayBuffer()))

    console.log('[fetch-tools-jar] Extracting tools.jar...')
    execFileSync(
      'tar',
      // --force-local: without it, GNU tar on Windows misreads a "C:\..." path
      // as a "host:path" remote-archive spec, because of the drive letter colon.
      [
        '-xzf',
        archivePath,
        '-C',
        tempDir,
        '--wildcards',
        '--force-local',
        '*/lib/tools.jar',
      ],
      { stdio: 'inherit' },
    )

    const [extracted] = globSync(path.join(tempDir, '*', 'lib', 'tools.jar'))
    if (!extracted) {
      throw new Error('tools.jar not found inside the downloaded archive.')
    }

    await copyFile(extracted, DEST)
    console.log(`[fetch-tools-jar] Wrote ${DEST}`)
  } finally {
    rmSync(tempDir, { recursive: true, force: true })
  }
}

main().catch((error) => {
  console.error('[fetch-tools-jar] Failed:', error.message)
  console.error(
    '[fetch-tools-jar] The exercise playground (ADR 0003, wasm-jvm) will report compilation as unavailable until public/tools.jar exists. Re-run `node scripts/fetch-tools-jar.mjs` once network access is available.',
  )
  // Non-fatal: don't break `pnpm install` over a missing optional runtime asset.
  process.exitCode = 0
})
