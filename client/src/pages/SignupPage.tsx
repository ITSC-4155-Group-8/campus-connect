import { 
    Input,
    Flex,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Spacer,
    Button, 
    Heading,
 } from '@chakra-ui/react'
 import React, { useState } from 'react';

function SignupPage() {
        const [inputValue, setInputValue] = useState<string>('');
      
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(event.target.value);
        };
        const buttonClick = () => {
          console.log('Input value:', inputValue);
        };

    return (
        <Flex flexWrap="wrap">
            <Heading justifyContent="center" size='sm'>Enter Information</Heading>
            <Spacer height="7"/>
            <Input value={inputValue} onChange={handleChange} placeholder='First Name' />
            <Spacer height="14"/>
            <Input placeholder='Last Name' />
            <Spacer height="14"/>
            <Select placeholder='Select Year'>
                <option value='option1'>Freshman</option>
                <option value='option2'>Sophmore</option>
                <option value='option3'>Junior</option>
                <option value='option4'>Senior</option>
            </Select>
            <Spacer height="14"/>
            <NumberInput defaultValue={18} min={18} max={30}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
            <Spacer height="14"/>
            <Select placeholder='Gender'>
                <option value='option1'>Male</option>
                <option value='option2'>Female</option>
                <option value='option3'>Other</option>
                <option value='option4'>Prefer Not to Say</option>
                <option value='option4'>Attack Helicopter</option>
            </Select>
            <Spacer height="14"/>
            <Input placeholder='Major' />
            <Spacer height="14"/>
            <Input placeholder='Minor' />
            <Spacer height="14"/>
            <Button onClick={buttonClick} colorScheme='blue'>Next</Button>
        </Flex>
    )
}

export default SignupPage;
