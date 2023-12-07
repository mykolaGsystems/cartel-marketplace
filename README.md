# cartel-marketplace

node_modules/framer-motion/dist/cjs/index.js line 4223 and changing from:
navigator.userAgent.toLowerCase().includes(string);to:

navigator?.userAgent?.toLowerCase().includes(string);
It was then possible to get the development server up and running
