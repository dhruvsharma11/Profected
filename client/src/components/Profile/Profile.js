import React, {useState, useEffect, useContext, useCallback} from 'react';
import {FirebaseContext} from '../Firebase';
import {Container, Typography, TextField, Button} from '@material-ui/core';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const firebase = useContext(FirebaseContext);

  const fetchUserProfile = useCallback(async () => {
    const user = firebase.auth.currentUser;
    if (user) {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/getUserProfile', {
        headers: {
          Authorization: idToken,
        },
      });
      const data = await response.json();
      setUserProfile(data);
    }
  }, [firebase]);

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const checkUserSubmission = async userID => {
    try {
      const response = await fetch('/api/checkUserSubmission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await firebase.doGetIdToken(),
        },
        body: JSON.stringify({userID}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.exists;
    } catch (error) {
      console.error('Error checking user submission:', error);
      throw error;
    }
  };

  useEffect(() => {
    const checkSubmission = async () => {
      const user = firebase.auth.currentUser;
      if (user) {
        const submitted = await checkUserSubmission(user.uid);
        setHasSubmitted(submitted);
      }
    };

    checkSubmission();
  }, [firebase]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const [editedDetails, setEditedDetails] = useState({
    university: '',
    program: '',
    graduation_year: '',
    career_interest: '',
    company: '',
    job_title: '',
    skills: '',
  });

  const handleSaveDetails = async () => {
    const user = firebase.auth.currentUser;
    if (user) {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/updateUserDetails', {
        method: 'POST',
        headers: {
          Authorization: idToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: user.uid,
          userType: userProfile.user.userType, // Add this line
          updatedDetails: editedDetails,
        }),
      });
      const data = await response.json();
      if (data.success) {
        // Refresh the user profile data after successful update
        fetchUserProfile();
        // Set isEditing to false after successful update
        setIsEditing(false);
      } else {
        console.error('Failed to update user details');
      }
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedDetails({
      university: userProfile.details.university,
      program: userProfile.details.program,
      graduation_year: userProfile.details.graduation_year,
      career_interest: userProfile.details.career_interest,
      company: userProfile.details.company,
      job_title: userProfile.details.job_title,
      skills: userProfile.details.skills,
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset editedDetails to the original userProfile details
    setEditedDetails({
      university: userProfile.details.university,
      program: userProfile.details.program,
      graduation_year: userProfile.details.graduation_year,
      career_interest: userProfile.details.career_interest,
      company: userProfile.details.company,
      job_title: userProfile.details.job_title,
      skills: userProfile.details.skills,
    });
  };

  return (
    <Container
      maxWidth="sm"
      style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
    >
      <Typography
        variant="h4"
        style={{margin: '100px', fontWeight: 700}}
        gutterBottom
      >
        User Profile
      </Typography>
      {userProfile && (
        <>
          <Typography variant="h6" style={{fontWeight: 700}}>
            Personal Information:
          </Typography>
          <Typography variant="body1">
            First Name: {userProfile.user.firstName}
          </Typography>
          <Typography variant="body1">
            Last Name: {userProfile.user.lastName}
          </Typography>
          <Typography variant="body1">
            Email: {userProfile.user.emailaddress}
          </Typography>

          {hasSubmitted &&
          (userProfile.user.userType === 'professional' ||
            userProfile.user.userType === 'student') &&
          !isEditing ? (
            <>
              <Typography
                variant="h6"
                style={{fontWeight: 700, marginTop: '25px'}}
              >
                {userProfile.user.userType === 'professional'
                  ? 'Professional Details:'
                  : 'Student Details:'}
              </Typography>
              {userProfile.user.userType === 'professional' && (
                <>
                  <Typography variant="body1">
                    Company: {userProfile.details.company}
                  </Typography>
                  <Typography variant="body1">
                    Job Title: {userProfile.details.job_title}
                  </Typography>
                  <Typography variant="body1">
                    Skills: {userProfile.details.skills}
                  </Typography>
                </>
              )}
              {userProfile.user.userType === 'student' && (
                <>
                  <Typography variant="body1">
                    University: {userProfile.details.university}
                  </Typography>
                  <Typography variant="body1">
                    Program: {userProfile.details.program}
                  </Typography>
                  <Typography variant="body1">
                    Graduation Year: {userProfile.details.graduation_year}
                  </Typography>
                  <Typography variant="body1">
                    Career Interest: {userProfile.details.career_interest}
                  </Typography>
                </>
              )}
              <Button
                style={{marginTop: '30px'}}
                onClick={handleEditClick}
                variant="contained"
                color="primary"
              >
                Edit Details
              </Button>
            </>
          ) : (
            <>
              {userProfile.user.userType === 'professional' && (
                <>
                  <TextField
                    label="Company"
                    value={editedDetails.company}
                    onChange={e =>
                      setEditedDetails({
                        ...editedDetails,
                        company: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Job Title"
                    value={editedDetails.job_title}
                    onChange={e =>
                      setEditedDetails({
                        ...editedDetails,
                        job_title: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Skills"
                    value={editedDetails.skills}
                    onChange={e =>
                      setEditedDetails({
                        ...editedDetails,
                        skills: e.target.value,
                      })
                    }
                  />
                </>
              )}
              {userProfile.user.userType === 'student' && (
                <>
                  <TextField
                    label="University"
                    value={editedDetails.university}
                    onChange={e =>
                      setEditedDetails({
                        ...editedDetails,
                        university: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Program"
                    value={editedDetails.program}
                    onChange={e =>
                      setEditedDetails({
                        ...editedDetails,
                        program: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Graduation Year"
                    value={editedDetails.graduation_year}
                    onChange={e =>
                      setEditedDetails({
                        ...editedDetails,
                        graduation_year: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Career Interest"
                    value={editedDetails.career_interest}
                    onChange={e =>
                      setEditedDetails({
                        ...editedDetails,
                        career_interest: e.target.value,
                      })
                    }
                  />
                </>
              )}
              <Button
                onClick={handleSaveDetails}
                variant="contained"
                color="primary"
                style={{marginTop: '10px'}}
              >
                Save
              </Button>
              <Button
                onClick={handleCancelEdit}
                variant="contained"
                style={{marginTop: '10px'}}
              >
                Cancel
              </Button>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Profile;
