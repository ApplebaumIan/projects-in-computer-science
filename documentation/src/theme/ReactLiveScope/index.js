import React from 'react';
import Figure from "../../components/Figure";
import dinosaur from "/static/img/docusaurus.png"
import ApiDocMdx from '@theme/ApiDocMdx';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  Figure,
  dinosaur,
  ApiDocMdx
};
export default ReactLiveScope;
