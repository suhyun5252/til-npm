# Framer Motion

- https://motion.dev/docs/react-quick-start
- https://velog.io/@keumky1/Framer-Motion-입문하기
- https://examples.motion.dev/react
- https://nykim.work/114

## 설치하기

```bash
npm install framer-motion
```

## 실습하기

-/src/pages/Framer.jsx

```jsx
import { motion } from "framer-motion";
const Framer = () => {
  return (
    <div>
      <h1>Framer Motion</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5 }}
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
```

```jsx
import { motion } from "framer-motion";
const Framer = () => {
  const [visisible, setVisisible] = useState(false);
  return (
    <div>
      <h1>Framer Motion</h1>
      <button onClick={() => setVisisible(!visisible)}>실행</button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visisible ? 1 : 0 }}
        transition={{ duration: 5 }}
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
```

```jsx
import { motion } from "framer-motion";
import { useState } from "react";
const Framer = () => {
  const [move, setMove] = useState(false);
  return (
    <div>
      <h1>Framer Motion</h1>
      <button onClick={() => setMove(!move)}>실행</button>
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: move ? 200 : -100 }}
        transition={{ duration: 0.5 }}
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
```

```jsx
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
```

```jsx
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
```
