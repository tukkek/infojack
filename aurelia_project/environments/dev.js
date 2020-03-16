export default {
  /* environment */
  debug:true,
  testing:true,
  /* game options */
  nodesize:4, //grid size for each node
  fullattributes:false, //no sense in having physical now
  ccskills:false, //only 1 is cross-class, so disable for now
  playeravatars:17,
  /* debug flags (false=disabled) */
  noice:false, //skip ICE generation
  revealmap:false, //system.reveal()
  scannodes:false, //avatar.scan() on all nodes
  systemlevel:false, //override system level
  view:false, //starting view name
  wealth:false, //overrides starting wealth
};
