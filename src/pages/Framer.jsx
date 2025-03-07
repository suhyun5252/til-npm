import { motion } from "framer-motion";
import { useState } from "react";
const Framer = () => {
  const [rot, setRot] = useState(false);
  return (
    <div>
      <h1>Framer Motion</h1>
      <button onClick={() => setRot(!rot)}>실행</button>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: rot ? 360 : 0 }}
        transition={{ duration: 0.5 }}
        drag
        dragConstraints={{
          top: 0,
          left: 0,
          right: 500,
          bottom: 500,
        }}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "red",
          borderRadius: 10,
        }}
      >
        애니메이션용 DIV
      </motion.div>
    </div>
  );
};
export default Framer;
