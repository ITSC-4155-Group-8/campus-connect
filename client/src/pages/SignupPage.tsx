import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Heading,
    Flex,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from '@chakra-ui/react'

enum GenderEnum {
    female = "female",
    male = "male",
    other = "other",
    unspecified = "unspecified"
}

enum GradeEnum {
    freshman = "1",
    sophomore = "sophomore",
    junior = "junior",
    senior = "senior",
    other = "other"
}

type Inputs = {
    firstname: string,
    lastname: string,
    gender: GenderEnum,
    age: number,
    grade: GradeEnum,
    major: string
}

function SignupPage() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>()

    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                resolve()
            }, 3000)
        })
    }

    return (
        <>
            <Heading justifyContent="center" size='sm'>Enter Information</Heading>
            <Flex flexWrap="wrap">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={Boolean(errors.firstname)}>
                        <FormLabel htmlFor='firstname'>First name</FormLabel>
                        <Input
                            id='firstname'
                            placeholder='first name'
                            {...register('firstname', {
                                required: 'This is required',
                                minLength: { value: 1, message: 'Minimum length should be 1' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.firstname && errors.firstname.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.lastname)}>
                        <FormLabel htmlFor='lastname'>Last name</FormLabel>
                        <Input
                            id='lastname'
                            placeholder='last name'
                            {...register('lastname', {
                                required: 'This is required',
                                minLength: { value: 1, message: 'Minimum length should be 1' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.lastname && errors.lastname.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.gender)}>
                        <FormLabel htmlFor='gender'>Gender</FormLabel>
                        <Select
                            id='gender'
                            {...register('gender', {
                                required: 'This is required',
                            })}
                        >
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='other'>Other</option>
                            <option value='unspecified'>Prefer not to say</option>
                        </Select>
                        <FormErrorMessage>
                            {errors.gender && errors.gender.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.age)}>
                        <FormLabel htmlFor='age'>Age</FormLabel>
                        <NumberInput defaultValue={18} min={18} id='age'
                            {...register('age', {
                                required: 'This is required',
                                min: { value: 18, message: 'Minimum should be 18' },
                            })}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>
                            {errors.age && errors.age.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.grade)}>
                        <FormLabel htmlFor='grade'>Grade Level</FormLabel>
                        <Select
                            id='grade'
                            {...register('grade', {
                                required: 'This is required',
                            })}
                        >
                            <option value='freshman'>Freshman</option>
                            <option value='sophomore'>Sophomore</option>
                            <option value='junior'>Junior</option>
                            <option value='senior'>Senior</option>
                            <option value='other'>Other</option>
                        </Select>
                        <FormErrorMessage>
                            {errors.grade && errors.grade.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.major)}>
                        <FormLabel htmlFor='major'>Major</FormLabel>
                        <Input
                            id='major'
                            placeholder='major'
                            {...register('major', {
                                required: 'This is required',
                                minLength: { value: 1, message: 'Minimum length should be 1' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.major && errors.major.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                        Submit
                    </Button>
                </form>
            </Flex>
        </>
    )
}

export default SignupPage;
