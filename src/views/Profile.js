import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authAPI } from "utils/api";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [allergies, setAllergies] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const history = useHistory();

  // Load existing profile data if available
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        if (response.data) {
          const user = response.data.user;
          setName(user.name || "");
          setEmail(user.email || "");
          setPhone(user.phone || "");
          setBloodGroup(user.bloodGroup || "");
          setHeight(user.height || "");
          setWeight(user.weight || "");
          setAllergies(user.allergies || "");
          
          // Check if profile is complete
          const isComplete = user.name && user.email;
          setIsProfileComplete(isComplete && (user.isRegistered !== false)); // Profile is complete if required fields exist and isRegistered is not explicitly false
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        // If there's an error loading profile, the user might be logging in for the first time
        // after admin authorization, so we'll continue with empty fields
      } finally {
        setProfileLoaded(true);
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use register API to update profile for authorized users
      const { data, error } = await authAPI.register({ 
        name, 
        email, 
        phone,
        password,
        bloodGroup,
        height,
        weight,
        allergies
      });
      
      if (data) {
        setSuccess(true);
        // Store token in localStorage (in case it was updated)
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        
        // Redirect to main profile page after successful completion
        setTimeout(() => {
          history.push("/");
        }, 2000);
      } else {
        setError(error || "Profile update failed");
      }
    } catch (err) {
      setError("An error occurred during profile completion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    {profileLoaded && isProfileComplete ? "Your Profile" : "Complete Your Profile"}
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {!profileLoaded ? (
                  <div className="text-center py-10">
                    <p>Loading profile...</p>
                  </div>
                ) : isProfileComplete ? (
                  <div className="text-center py-10">
                    <h3 className="text-xl font-bold mb-4">Your Profile is Complete!</h3>
                    <p className="mb-6">You have successfully completed your profile.</p>
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      onClick={() => history.push('/')}
                    >
                      Go to Dashboard
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password (optional if already set)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    {/* Health Information Section */}
                    <div className="relative w-full mb-3 mt-6">
                      <h6 className="text-blueGray-400 text-sm font-bold mb-3">
                        Optional Health Information
                      </h6>
                      
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="bloodGroup"
                        >
                          Blood Group
                        </label>
                        <input
                          type="text"
                          id="bloodGroup"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Blood Group (e.g., O+, AB-)"
                          value={bloodGroup}
                          onChange={(e) => setBloodGroup(e.target.value)}
                        />
                      </div>
                      
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="height"
                        >
                          Height
                        </label>
                        <input
                          type="text"
                          id="height"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Height (e.g., 5'10&quot; or 178 cm)"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                        />
                      </div>
                      
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="weight"
                        >
                          Weight
                        </label>
                        <input
                          type="text"
                          id="weight"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Weight (e.g., 70 kg or 154 lbs)"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </div>
                      
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="allergies"
                        >
                          Allergies
                        </label>
                        <input
                          type="text"
                          id="allergies"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Allergies (if none, leave blank)"
                          value={allergies}
                          onChange={(e) => setAllergies(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Updating Profile..." : "Complete Profile"}
                      </button>
                    </div>
                    
                    {error && (
                      <div className="text-red-500 text-center mt-3">
                        {error}
                      </div>
                    )}
                    
                    {success && (
                      <div className="text-green-500 text-center mt-3">
                        Profile completed successfully! Redirecting...
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}