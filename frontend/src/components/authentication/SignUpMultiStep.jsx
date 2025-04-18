import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/url';

const DOMAINS = [
  { id: 1, name: 'Frontend Development',  },
  { id: 2, name: 'Backend Development',  },
  { id: 3, name: 'Full Stack Development',  },
  { id: 4, name: 'System Design',  },
  { id: 5, name: 'Mobile Development',  },
  { id: 6, name: 'Cloud Computing',  },
  { id: 7, name: 'DevOps',  },
  { id: 8, name: 'Data Engineering',  },
  { id: 9, name: 'Machine Learning',  },
  { id: 10, name: 'Security',  },
];

const SignUpMultiStep = () => {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    selectedDomains: [],
  });



  const handleDomainToggle = (domain) => {
    setFormData(prev => ({
      ...prev,
      selectedDomains: prev.selectedDomains.includes(domain)
        ? prev.selectedDomains.filter(d => d !== domain)
        : [...prev.selectedDomains, domain]
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if(formData.password!==formData.confirmPassword) return alert("Both passwords must be same")
      if (step === 1) {
        setStep(2);
      } else {
        // Handle final form submission
        const res = await axios.post(`${BASE_URL}/api/users/register`,
          {
            fullName:formData.fullName,
            password:formData.password,
            email:formData.email,
            bio:formData.bio,
            domain:formData.selectedDomains
  
          },
          {
            withCredentials: true, 
            headers: {
              "Content-Type": "application/json", 
            },
          }
        )
  
        navigate('/userprofile');
  
        console.log('Form submitted:', formData);
      }
    } catch (err) {
      throw new Error("error while signing up",err);
      
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {step === 1 ? 'Create your account' : 'Choose your expertise'}
          </h2>
          <p className="text-gray-600">
            {step === 1 
              ? "First, let's get your basic information" : "Select the domains you're proficient in"}
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <div className={`h-3 w-3 rounded-full ${step === 1 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
          <div className={`h-3 w-3 rounded-full ${step === 2 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="full-name"
                    name="full-name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {DOMAINS.map((domain) => (
                  <div
                    key={domain.id}
                    onClick={() => handleDomainToggle(domain.name)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      formData.selectedDomains.includes(domain.name)
                        ? 'bg-indigo-100 border-2 border-indigo-500'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900 mb-2">{domain.name}</h3>
                    {/* <div className="flex flex-wrap gap-2">
                      {domain.topics.slice(0, 2).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs bg-white px-2 py-1 rounded-full text-gray-600"
                        >
                          {topic}
                        </span>
                      ))}
                      {domain.topics.length > 2 && (
                        <span className="text-xs text-gray-500">+{domain.topics.length - 2} more</span>
                      )}
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className={`flex items-center justify-center px-8 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                step === 1 ? 'ml-auto' : ''
              }`}
            >
              {step === 1 ? 'Next' : 'Complete Sign Up'} <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpMultiStep