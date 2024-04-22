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
    NumberDecrementStepper,
    Textarea,
    Text,
    Spacer
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
    first_name: string,
    last_name: string,
    gender: GenderEnum,
    age: number,
    school_year: GradeEnum,
    major: string,
    minor: string,
    bio: string,
    likes: string,
    dislikes: string,
    h_likes: string,
    h_dislikes: string,
}

function SignupPage() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>()

    function onSubmit(values) {
        fetch(apiURL + '/profile', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        }).then((response) => {
            if (response.status < 300) window.location.reload();
        })

    }

    return (
        <>
            <Heading justifyContent="center" size='sm'>Enter Information</Heading>
            <Flex flexWrap="wrap">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={Boolean(errors.first_name)}>
                        <FormLabel htmlFor='first_name'>First name</FormLabel>
                        <Input
                            id='first_name'
                            placeholder='First name'
                            {...register('first_name', {
                                required: 'This is required',
                                minLength: { value: 1, message: 'Minimum length should be 1' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.first_name && errors.first_name.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.last_name)}>
                        <FormLabel htmlFor='last_name'>Last name</FormLabel>
                        <Input
                            id='last_name'
                            placeholder='Last name'
                            {...register('last_name', {
                                required: 'This is required',
                                minLength: { value: 1, message: 'Minimum length should be 1' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.last_name && errors.last_name.message}
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

                    <FormControl isInvalid={Boolean(errors.school_year)}>
                        <FormLabel htmlFor='school_year'>Grade Level</FormLabel>
                        <Select
                            id='school_year'
                            {...register('school_year', {
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
                            {errors.school_year && errors.school_year.message}
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

                    <FormControl isInvalid={Boolean(errors.minor)}>
                        <FormLabel htmlFor='minor'>Minor</FormLabel>
                        <Input
                            id='minor'
                            placeholder='minor'
                            {...register('minor')}
                        />
                        <FormErrorMessage>
                            {errors.minor && errors.minor.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.bio)}>
                        <FormLabel htmlFor='bio'>Bio</FormLabel>
                        <Textarea
                            id="bio"
                            placeholder='Enter bio Here'
                            size='sm'
                            {...register('bio', {
                                required: 'This is required',
                                minLength: { value: 1, message: 'Minimum length should be 1' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.bio && errors.bio.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.bio)}>
                        <FormLabel htmlFor='likes'>Let others know what you like:</FormLabel>
                        <Textarea justifyContent={'center'}
                            placeholder='Ex: Video Games, Fencing, Swimming, ect...'
                            size='sm'
                            {...register('likes', {
                                required: 'This is required',
                                minLength: { value: 1, message: 'Minimum length should be 1' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.likes && errors.likes.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.bio)}>
                        <FormLabel htmlFor='dislikes'>Let others know what you DONT like:</FormLabel>
                        <Textarea justifyContent={'center'}
                            placeholder='Ex: Spiders, People, Puppies, ect...'
                            size='sm'
                            {...register('dislikes', {
                                required: 'This is required',
                                minLength: { value: 1, message: 'Minimum length should be 1' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.dislikes && errors.dislikes.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.bio)}>
                        <FormLabel htmlFor='h_likes'>What do you NOT want others to know you like:</FormLabel>
                        <Textarea justifyContent={'center'}
                            placeholder='Ex: Sports, Trees, Cats, ect...'
                            size='sm'
                            {...register('h_likes', {
                                required: 'This is required',
                                minLength: { value: 1, message: 'Minimum length should be 1' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.h_likes && errors.h_likes.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={Boolean(errors.bio)}>
                        <FormLabel htmlFor='h_dislikes'>What do you NOT want others to know you DONT like:</FormLabel>
                        <Textarea justifyContent={'center'}
                            placeholder='Ex: Ocean, People, Puppies, ect...'
                            size='sm'
                            {...register('h_dislikes', {
                                required: 'This is required',
                                minLength: { value: 1, message: 'Minimum length should be 1' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.h_dislikes && errors.h_dislikes.message}
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
