import { IdTokenResult, OperationType, UserCredential } from "firebase/auth";

export const userCredentialMock: UserCredential = {
    user: {
        uid: '1',
        displayName: null,
        email: null,
        phoneNumber: null,
        photoURL: null,
        providerId: 'string',
        emailVerified: false,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: 'string',
        tenantId: null,
        delete: () => Promise.resolve(),
        getIdToken: () => Promise.resolve(''),
        getIdTokenResult: () => Promise.resolve({} as unknown as IdTokenResult),
        reload: () => Promise.resolve(),
        toJSON: () => ({})
    },
    providerId: null,
    operationType: OperationType.LINK
}
