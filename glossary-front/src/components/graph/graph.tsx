import { useEffect, useRef } from 'react';
import { IEdge, IMindMap, INode } from '../../model/model';
// @ts-ignore
import coseBilkent from 'cytoscape-cose-bilkent';
import cytoscape, { BaseLayoutOptions } from 'cytoscape';

import './graph.css';

const stringToColor = (str: string) => {
  const colors = [
    '#FFB6C1', // Light Pink
    '#ADD8E6', // Light Blue
    '#90EE90', // Light Green
    '#FFD700', // Gold
    '#FF69B4', // Hot Pink
    '#87CEFA', // Light Sky Blue
    '#98FB98', // Pale Green
    '#FFA07A', // Light Salmon
    '#DDA0DD', // Plum
    '#00CED1', // Dark Turquoise
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash); // Hashing the string
  }
  return colors[Math.abs(hash) % colors.length]; // Pick a color based on hash
};


const CytoscapeGraph = ({ nodes, edges }: IMindMap) => {
  const cyRef = useRef(null); // Reference to the Cytoscape container

  const handleResize = (cy: any) => {
    cy.resize();
    cy.fit();
  }

  useEffect(() => {
    cytoscape.use(coseBilkent);

    // Initialize Cytoscape
    const cy = cytoscape({
      container: cyRef.current, // DOM element to render the graph

      elements: [
        ... nodes.map((node: INode) => ({ data: node })),
        ... edges.map((edge: IEdge) => ({ data: edge }))
      ],

      style: [
        {
          selector: 'node',
          style: {
            'background-color': (e) => stringToColor(e.id()),
            label: 'data(label)',
            'font-size': '14px',
            'text-valign': 'center',
            'text-halign': 'center',
            color: '#333333', // Dark gray text for contrast
            'text-outline-width': 1,
            'text-outline-color': '#FFFFFF', // White text outline for readability
            width: '50px',
            height: '50px',
            'border-width': 2,
            'border-color': '#888888',
          },
        },
        {
          selector: 'edge',
          style: {
            'line-color': '#A9A9A9', // Neutral edge color
            'target-arrow-color': '#A9A9A9',
            'target-arrow-shape': 'triangle',
            width: 2,
            label: 'data(label)',
            'font-size': '12px',
            'curve-style': 'bezier',
            color: '#4F4F4F', // Darker text for edges
            'text-background-opacity': 1,
            'text-background-color': '#FFFFFF', // White background for edge labels
            'text-background-padding': '3px',
            'text-border-opacity': 1,
            'text-border-width': 1,
            'text-border-color': '#CCCCCC', // Light gray border
          },
        },
      ],

      layout: {
        name: 'cose-bilkent',
        animate: false,
        padding: 20, // Add padding around nodes
        idealEdgeLength: 150, // Increase to lengthen edges and space nodes
      } as BaseLayoutOptions,
    });

    window.addEventListener('resize', () => handleResize(cy));

    // Clean up Cytoscape instance on unmount
    return () => {
      window.removeEventListener('resize', () => handleResize(cy));
      cy.destroy();
    };
  }, []);

  return (
    <div
      ref={cyRef}
      style={{
        width: '100vw',
        height: '500px', 
        border: '1px solid #ddd',
        background: 'linear-gradient(120deg, #FAFAFA, #F0F8FF)',
      }}
    />
  );
};

export default CytoscapeGraph;