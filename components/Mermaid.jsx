import React from 'react';
import { MermaidDiagram } from '@lightenna/react-mermaid-diagram';

const Mermaid = ({diagramText}) => {
  return <MermaidDiagram>{diagramText}</MermaidDiagram>;
};

export default Mermaid;
