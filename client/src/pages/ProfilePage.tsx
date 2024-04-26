// import { Link } from "react-router-dom";
import { Container, Box, Text, Flex, Image, Heading, Button, Input } from '@chakra-ui/react'
import imgsrc from "../assets/profilePic.jpg"
import { EditIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'; 
import { useOutletContext } from 'react-router-dom';



// class User {
//     name: string;
//     hometown: string; 
//     major: string; 
//     bio: string; 

//     constructor(name: string, hometown: string, major: string, bio: string) {
//         this.name = name;
//         this.hometown = hometown; 
//         this.major = major; 
//         this.bio = bio; 
//     }
// }

// let user = new User('Pedro', 'Hickory', 'Computer Science', "I like watching movies, building Lego, and walking my dog.");



function ProfilePage() {

    const { user } = useOutletContext();

    const [editingProfile, setEditingProfile] = useState(false);
    const [editedHometown, setEditedHometown] = useState(Response.name);
    // const [editedMajor, setEditedMajor] = useState(Response.major);
    // const [editedBio, setEditedBio] = useState(user.bio);

    const handleEditProfile = () => {
        setEditingProfile(true);
    };

    console.log(user); 

    // const handleSaveChanges = () => {
    //     user.hometown = editedHometown;
    //     user.major = editedMajor;
    //     user.bio = editedBio;
    //     setEditingProfile(false);
    // };

    return (
        <>
            <Flex justifyContent={'flex-start'} padding='10' direction={'row'} gap={"50px"}>
                <Image src={imgsrc} height='100px' width='100px' padding={"0"} />
                <Flex
                direction={"column"}
                gap={"10px"}>
                    <Heading fontSize='30px'>{user.first_name} {user.last_name}</Heading>  
                    <Text fontSize='15px' as='b' >{user.email}</Text>
                </Flex>
            </Flex>

            <Box>
                <Flex gap={"15"} direction={"column"}>
                    {editingProfile ? (
                        <>
                            <Text>Hometown:</Text>
                            <Input
                                value={editedHometown}
                                onChange={(e) => setEditedHometown(e.target.value)}
                            />
                            <Text>Major:</Text>
                            <Input
                                value={editedMajor}
                                onChange={(e) => setEditedMajor(e.target.value)}
                            />
                            <Text>Bio:</Text>
                            <Input
                                value={editedBio}
                                onChange={(e) => setEditedBio(e.target.value)}
                            />
                            <Button leftIcon={<EditIcon />} colorScheme='blue' onClick={handleSaveChanges}>Save Changes</Button>
                        </>
                    ) : (
                        <>
                        <Box
                        padding={"20px"}
                        borderRadius={'lg'}
                        background={"#CCEEFF"}>
                            <Flex
                            direction={"column"}gap={"5"}>
                            <Text>Age: {user.age}</Text>

                            <Text>Major: {user.major}</Text>

                            <Text>Bio: {user.bio}</Text>

                            <Text>School Year:  {user.school_year}</Text>

                            <Text>User Likes: {user.user_likes}</Text>

                            <Text>Dislikes: {user.user_dislikes}</Text>


                            <Text>Hidden Likes: {user.hidden_likes}</Text>

                            <Text>Hidden Dislikes: {user.hidden_dislikes}</Text>
                            </Flex>
                        </Box>

                        <Box height={"100px"}></Box>
                            
                        </>
                    )}
                </Flex>
            </Box> 
        </>
    )
}


    
export default ProfilePage;