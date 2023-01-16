import React from 'react';

function getDimensionObject(node) {
    const rect = node.getBoundingClientRect();

    return {
        width: rect.width,
        height: rect.height,
        top: "x" in rect ? rect.x : rect.top,
        left: "y" in rect ? rect.y : rect.left,
        x: "x" in rect ? rect.x : rect.left,
        y: "y" in rect ? rect.y : rect.top,
        right: rect.right,
        bottom: rect.bottom
    };
}

//useDimensions
function useDimensions(){
  
  let resizeID;

  const [dimensions, setDimensions] = React.useState({});
  const [node, setNode] = React.useState(null);

  const ref = React.useCallback(node => {
      setNode(node);
  }, []);

  React.useLayoutEffect(() => {
      if (node) {
          const measure = () => {
            
            clearTimeout(resizeID);
            
            resizeID = setTimeout(() => {
              setDimensions(getDimensionObject(node))
            }, 150)
          }
          
          measure();

          window.addEventListener("resize", measure);

          return () => {
              window.removeEventListener("resize", measure);
          };
      }
  }, [node]);

  return [ref, dimensions, node]
}

export default useDimensions