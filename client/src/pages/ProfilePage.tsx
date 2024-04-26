// import { Link } from "react-router-dom";
import { Container, Box, Text, Flex, Image, Heading, Button, Input } from '@chakra-ui/react'
import imgsrc from "../assets/profilePic.jpg"
import { EditIcon } from '@chakra-ui/icons'
import { useState } from 'react'; 



// const matchClick = () => {editingProfile = true, console.log(editingProfile)}; 
// const matchClick2 = () => {editingProfile = false, console.log(editingProfile)}; 

class User {
    name: string;
    hometown: string; 
    major: string; 
    bio: string; 

    constructor(name: string, hometown: string, major: string, bio: string) {
        this.name = name;
        this.hometown = hometown; 
        this.major = major; 
        this.bio = bio; 
    }
}

let user = new User('Pedro', 'Hickory', 'Computer Science', "I like watching movies, building Lego, and walking my dog.");

function ProfilePage() {
    const [editingProfile, setEditingProfile] = useState(false);
    const [editedHometown, setEditedHometown] = useState(user.hometown);
    const [editedMajor, setEditedMajor] = useState(user.major);
    const [editedBio, setEditedBio] = useState(user.bio);

    const handleEditProfile = () => {
        setEditingProfile(true);
    };

    const handleSaveChanges = () => {
        user.hometown = editedHometown;
        user.major = editedMajor;
        user.bio = editedBio;
        setEditingProfile(false);
    };

    return (
        <>
            <Flex justifyContent={'flex-start'} padding='10' direction={'row'} gap={"50px"}>
                <Image src={imgsrc} height='100px' width='100px' padding={"0"} />
                <Heading fontSize='30px'>{user.name}</Heading>  
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
                            <Text>Hometown: {user.hometown}</Text>
                            <Text>Major: {user.major}</Text>
                            <Text>Bio: {user.bio}</Text>
                            <Box 
                            height={"150px"}></Box>
                            <Button leftIcon={<EditIcon />} colorScheme='blue' onClick={handleEditProfile}>Edit Profile</Button>
                        </>
                    )}
                </Flex>
            </Box>
        </>
    )
}

export default ProfilePage;