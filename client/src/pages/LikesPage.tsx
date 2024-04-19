import { Flex, Textarea,Text,Button,Spacer } from '@chakra-ui/react'
import React from 'react'

function LikesPage() {
    let [value1] = React.useState('')
    let [value2] = React.useState('')
    let [value3] = React.useState('')
    let [value4] = React.useState('')

    const buttonClick = () => {
        console.log('Input value:');
      };
    return (
        <Flex flexWrap="wrap">
            <Text mb='8px'>Let others know what you like:</Text>
                <Textarea justifyContent={'center'}
                    value={value1}
                    placeholder='Ex: Video Games, Fencing, Swimming, ect...'
                    size='sm'
                />
            <Spacer height="14"/>
            <Text mb='8px'>Let others know what you DONT like:</Text>
                <Textarea justifyContent={'center'}
                    value={value2}
                    placeholder='Ex: Racism, People, Puppies, ect...'
                    size='sm'
                />
            <Text mb='8px'>What do you NOT want others to know you like:</Text>
                <Textarea justifyContent={'center'}
                    value={value3}
                    placeholder='Ex: Sports, Trees, Cats, ect...'
                    size='sm'
                />
            <Text mb='8px'>What do you NOT want others to know you DONT like:</Text>
                <Textarea justifyContent={'center'}
                    value={value4}
                    placeholder='Ex: Racism, People, Puppies, ect...'
                    size='sm'
                />
                <Spacer height="15"/>
            <Button onClick={buttonClick} colorScheme='blue'>Finish</Button>
        </Flex>

    )
}

export default LikesPage;