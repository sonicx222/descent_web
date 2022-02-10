import * as React from 'react';
import NavigationRoutes from './route/NavigationRoutes';

import './App.css';

// const App = () => (
//   // const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
//   // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
//   // alert('vw: ' + vw + ', vh:' + vh);

//   <div className="app">
//     <h3 style={{ position: 'absolute', left: 10, top: 10, color: 'white' }}>V2</h3>
//     <Routes>
//       <Route path="/" element={<Login />}>
//         <Route path="*" element={<NoMatch />} />
//       </Route>
//       <Route path="/login" element={<Login />} />
//       <Route path="/logout" element={<Logout />} />
//       <Route path="/register" element={<Register />} />
//       <Route
//         path="/start"
//         element={
//           <RequireAuth>
//             <Start />
//           </RequireAuth>
//         }
//       />
//       <Route path="/newcampaign" element={<NewCampaign />} />
//       <Route
//         path="/campaigns"
//         element={
//           <RequireAuth>
//             <CampaignSelection />
//           </RequireAuth>
//         }
//       />
//       <Route path="/heroselection" element={<HeroSelection />} />
//       <Route path="/prolog" element={<Prolog />} />
//       <Route path="/travelmap" element={<Travelmap />} />
//       <Route path="/testmap" element={<Testmap />} />
//       <Route path="/test" element={<Test />} />
//     </Routes>
//   </div>
// );

const App = () => (
  // const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  // alert('vw: ' + vw + ', vh:' + vh);

  // <Container>
    

  // </Container>
  <NavigationRoutes />
);

export default App;
