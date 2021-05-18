export interface User {
    name: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
}

export interface UserR {
    emailGroup: {
        name: string;
        email: string;
        confirmEmail: string;
    },
    passwordGroup: {
        password: string;
        confirmPassword: string;
    };
};

export const mockValidRuser: UserR = {
    emailGroup: {
        name: 'myName',
        email: 'me@b.com',
        confirmEmail: 'me@b.com'
    },
    passwordGroup: {
        password: 'myPassword',
        confirmPassword: 'myPassword'
    }
};

export const mockInvalidRuser: UserR = {
    emailGroup: {
        name: 'myName',
        email: 'mecom',
        confirmEmail: 'me@b.com'
    },
    passwordGroup: {
        password: 'myPassword',
        confirmPassword: 'myPassword'
    }
};