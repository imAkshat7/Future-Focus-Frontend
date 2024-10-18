import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [careerOptions, setCareerOptions] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [showAllSkills, setShowAllSkills] = useState(false); // New state for showing more skills

  const skills = [
    'Python', 'Java', 'AWS', 'React', 'C++', 'SQL', 'JavaScript', 'Git', 'Kubernetes', 'Docker',
    'Go', 'Ruby', 'Swift', 'TypeScript', 'HTML', 'CSS', 'PHP', 'Perl', 'Scala', 'Rust', 'C#',
    // Add more skills as needed
  ];

  const handleSkillClick = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      if (selectedSkills.length < 6) {
        setSelectedSkills([...selectedSkills, skill]);
      } else {
        setError('You can select up to 6 skills only.');
      }
    }
  };

  const handleSubmit = async () => {
    if (selectedSkills.length < 1) {
      setError('Please select at least one skill.');
      return;
    }

    setError('');
    const response = await fetch('https://future-focus.onrender.com/predict-job-title', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skills: selectedSkills }),
    });

    const data = await response.json();

    if (Array.isArray(data.predicted_job_title)) {
      setCareerOptions(data.predicted_job_title);
    } else if (data.predicted_job_title) {
      setCareerOptions([data.predicted_job_title]);
    } else {
      console.error('No career options found in the response:', data);
      setCareerOptions([]);
    }
  };

  const filteredSkills = skills.filter(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
  const displayedSkills = showAllSkills ? filteredSkills : filteredSkills.slice(0, 20); // Show only 20 skills if not expanded

  // Separate selected and unselected skills
  const selected = displayedSkills.filter(skill => selectedSkills.includes(skill));
  const unselected = displayedSkills.filter(skill => !selectedSkills.includes(skill));

  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-2">
          <i className="fas fa-layer-group text-xl"></i>
          <span className="font-semibold text-lg">Future Focus</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="text-gray-700">Home</a>
          <a href="#" className="text-gray-700">Explore</a>
          <a href="#" className="text-gray-700">Guides</a>
          <a href="#" className="text-gray-700">Quiz</a>
          <a href="#" className="text-gray-700">Resources</a>
        </nav>
        <div className="flex items-center space-x-4">
          <i className="fas fa-globe text-xl"></i>
          <i className="fas fa-briefcase text-xl"></i>
          <i className="fas fa-bell text-xl"></i>
          <i className="fas fa-play-circle text-xl"></i>
          <img src="https://placehold.co/40x40" alt="User profile picture" className="rounded-full w-10 h-10"/>
        </div>
      </header>
      <main className="flex flex-col items-center mt-10 px-4 md:px-0">
        <h1 className="text-3xl font-semibold text-center">What are your skills?</h1>
        <p className="text-gray-600 mt-2 text-center">Select the skills you'd like to include in your career path. You can always add or remove them later.</p>
        <div className="mt-10 w-full md:w-1/2">
          {loading ? (
            <div className="flex items-center justify-center p-4 border rounded-md border-gray-300 bg-gray-100">
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Loading...
            </div>
          ) : (
            careerOptions.length > 0 && (
              <div className="border rounded-md p-4 bg-gray-10">
                <h2 className="text-2xl font-semibold text-center">Career Options</h2>
                <ul className="mt-4">
                  {careerOptions.map((option, index) => (
                    <li className="p-3 border-b" key={index}>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
        <div className="mt-6 w-full md:w-1/2">
          <input 
            type="text" 
            placeholder="Search for a skill" 
            className="w-full p-3 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full md:w-1/2">
          {/* Render selected skills first */}
          {selected.map(skill => (
            <button
              key={skill}
              className={`flex items-center justify-center p-3 border rounded-md bg-blue-500 text-white`}
              onClick={() => handleSkillClick(skill)}
            >
              <i className="fas fa-check mr-2"></i>
              {skill}
            </button>
          ))}

          {/* Render unselected skills */}
          {unselected.map(skill => (
            <button
              key={skill}
              className={`flex items-center justify-center p-3 border rounded-md ${selectedSkills.includes(skill) ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => handleSkillClick(skill)}
            >
              {selectedSkills.includes(skill) ? <i className="fas fa-check mr-2"></i> : <i className="fas fa-plus mr-2"></i>}
              {skill}
            </button>
          ))}
        </div>
        {filteredSkills.length > 20 && !showAllSkills && (
  <button 
    onClick={() => setShowAllSkills(true)} 
    className="mt-4 flex items-center justify-center p-3 border rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
  >
    <i className="fas fa-plus mr-2"></i>
    Show More Skills
  </button>
)}

        {error && <p className="text-red-500 mt-4">{error}</p>}
        <button onClick={handleSubmit} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md">Enter</button>
       
      </main>
    </div>
  );
}

export default App;
