import { SignInProps } from '@/app/(auth)/sign-in';
import { SignUpProps } from '@/app/(auth)/sign-up';
import {
  Account,
  AppwriteException,
  Avatars,
  Client,
  Databases,
  ID,
  TablesDB,
} from 'react-native-appwrite';
export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  tableId: process.env.EXPO_PUBLIC_APPWRITE_USER_TABLE_ID!,
};

export interface User {
  $id: string;
  $sequence: number;
  $tableId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  accountId: string;
  avatar: string;
  name: string;
  email: string;
}

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);

export const tablesDB = new TablesDB(client);

export const databases = new Databases(client);

const avatars = new Avatars(client);

export const createUser = async ({ name, email, password }: SignUpProps) => {
  try {
    const newAccount = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });

    console.log('New Account:', newAccount.$id);

    if (!newAccount.$id) {
      throw new Error('Failed to create user');
    }

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    const newUser = await tablesDB.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.tableId,
      rowId: newAccount.$id,
      data: {
        accountId: newAccount.$id,
        avatar: avatarUrl,
        name,
        email,
      },
    });

    return newUser;
  } catch (error: any) {
    console.error('Create user error:', error.message, error);
    throw error;
  }
};

const signIn = async ({ email, password }: SignInProps) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) {
      throw new Error('Failed to sign in');
    }
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount.$id) {
      throw new Error('Failed to get current user');
    }

    const currentUser: User = await tablesDB.getRow<User>({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.tableId,
      rowId: currentAccount.$id,
    });

    return currentUser;
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error('Get current user error:', error.message, error);
    } else {
      console.error('Get current user error:', error);
    }
    throw error;
  }
};
