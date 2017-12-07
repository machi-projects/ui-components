export default clone=(...rest)=>{
  return Object.assign.apply(null,[{}].concat(rest))
}
