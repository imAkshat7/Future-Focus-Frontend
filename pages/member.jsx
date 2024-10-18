import React from 'react';
import Header from './components/Header';
import TeamMember from './components/TeamMember';
import './index.css';

const App = () =&gt; {
  const teamMembers = [
    {
      name: "Akshat Sankla",
      skills: "BurpSuit, Wireshark, C++, React",
      enrollment: "EN21CS301070",
      section: "7-CSE B"
    },
    {
      name: "Aniruddha Jaiswal",
      skills: "Python, Django, Machine Learning",
      enrollment: "EN21CS301097",
      section: "7-CSE B"
    },
    {
      name: "Abhay Saxena",
      skills: "C++, React, Data Structures",
      enrollment: "EN22CS3L1002",
      section: "7-CSE B"
    }
  ];

  return (
<div classname="p-4 md:p-8">
 <header>
 </header>
 <main>
  <h1 classname="text-2xl md:text-3xl font-bold text-black mb-2">
   Build a mobile app with React Native
  </h1>
  <p classname="text-gray-600 mb-6">
   A group project by SkillSprint Team
  </p>
  <button classname="bg-gray-100 text-black px-4 py-2 rounded-md mb-6">
   Join the team
  </button>
  <section>
   <h2 classname="text-lg md:text-xl font-semibold text-black mb-4">
    Team members
   </h2>
   <div classname="space-y-4">
    {teamMembers.map((member, index) =&gt; (
    <teammember enrollment="{member.enrollment}" key="{index}" name="{member.name}" section="{member.section}" skills="{member.skills}" title="{member.title}">
    </teammember>
    ))}
   </div>
  </section>
 </main>
</div>
);
};

export default App;