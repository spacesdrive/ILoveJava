import type { ComponentType } from 'react'

import { ControlFlowIfElseDiagram } from './control-flow-if-else'
import { JavaExecutionFlowDiagram } from './java-execution-flow'
import { JdkJreJvmDiagram } from './jdk-jre-jvm'
import { ProgramStructureAnatomyDiagram } from './program-structure-anatomy'
import { VariableMemoryBoxDiagram } from './variable-memory-box'

/**
 * Lookup for the `visualization` block type (`LessonBlock`'s `component` field).
 * Add a new diagram by building it here and registering its id - lesson content
 * then references it by that id, decoupled from the component implementation.
 */
export const DIAGRAM_REGISTRY: Record<string, ComponentType> = {
  'java-execution-flow': JavaExecutionFlowDiagram,
  'jdk-jre-jvm': JdkJreJvmDiagram,
  'program-structure-anatomy': ProgramStructureAnatomyDiagram,
  'variable-memory-box': VariableMemoryBoxDiagram,
  'control-flow-if-else': ControlFlowIfElseDiagram,
}
