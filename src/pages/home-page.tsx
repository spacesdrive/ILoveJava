import { Seo } from '@/components/seo/seo'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/constants/site'

import { CurriculumPreview } from './home/curriculum-preview'
import { FeatureGrid } from './home/feature-grid'
import { FinalCta } from './home/final-cta'
import { HeroSection } from './home/hero-section'
import { HowItWorks } from './home/how-it-works'

export function HomePage() {
  return (
    <>
      <Seo
        title="Learn Java, Interactively"
        description={SITE_DESCRIPTION}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          url: SITE_URL,
        }}
      />
      <HeroSection />
      <FeatureGrid />
      <HowItWorks />
      <CurriculumPreview />
      <FinalCta />
    </>
  )
}
