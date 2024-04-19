import { Flex, Textarea,Text,Button,Spacer } from '@chakra-ui/react'
import React from 'react'

function BioPage() {
    let [value, setValue] = React.useState('')

    let handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value
      setValue(inputValue)
    }
    const buttonClick = () => {
        console.log('Input value:');
      };
    return (
        <Flex justifyContent={'center'} flexWrap="wrap">
            <Text mb='8px'>Let Others Know More About Yourself:</Text>
                <Textarea
                    value={value}
                    onChange={handleInputChange}
                    placeholder='Enter bio Here'
                    size='sm'
                />
                <Spacer height="15"/>
                <Button onClick={buttonClick} colorScheme='blue'>Next</Button>
        </Flex>
    )
}

export default BioPage;