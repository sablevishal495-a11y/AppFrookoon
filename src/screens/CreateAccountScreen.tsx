import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const CustomInput = ({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = "default",
}: {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: any;
}) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.textInput}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                />
            </View>
        </View>
    );
};

const CreateAccountScreen = () => {
    const navigation = useNavigation<any>();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleCreateAccount = () => {
        // Logic for account creation
        console.log("Creating account for:", fullName, email);
        navigation.replace('Home');
    };

    const handleSocialSignUp = (provider: string) => {
        console.log(`Signing up with ${provider}`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Back Button */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => BackHandler.exitApp()}
                        activeOpacity={0.7}
                    >
                        <Icon name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>

                    {/* Title Section */}
                    <View style={styles.titleSection}>
                        <Text style={styles.titleText}>Create an Account</Text>
                        <Text style={styles.subtitleText}>Let’s Create Your Account</Text>
                    </View>

                    {/* Input Fields */}
                    <View style={styles.formContainer}>
                        <CustomInput
                            label="Full Name"
                            placeholder="Enter Your Full Name"
                            value={fullName}
                            onChangeText={setFullName}
                        />
                        <CustomInput
                            label="Email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <CustomInput
                            label="Password"
                            placeholder="Enter Your Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    {/* Primary Button */}
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleCreateAccount}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.primaryButtonText}>Create an Account</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>Or</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Social Buttons */}
                    <View style={styles.socialContainer}>
                        <TouchableOpacity
                            style={styles.socialButton}
                            onPress={() => handleSocialSignUp("Google")}
                            activeOpacity={0.7}
                        >
                            <AntDesign name="google" size={22} color="#000" style={styles.socialIcon} />
                            <Text style={styles.socialButtonText}>Sign Up with Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.socialButton}
                            onPress={() => handleSocialSignUp("Facebook")}
                            activeOpacity={0.7}
                        >
                            <FontAwesome name="facebook" size={22} color="#000" style={styles.socialIcon} />
                            <Text style={styles.socialButtonText}>Sign Up with Facebook</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F4F4F4",
    },
    scrollContainer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: Platform.OS === "android" ? 20 : 0,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 3,
    },
    titleSection: {
        marginBottom: 30,
    },
    titleText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#F57C00",
        marginBottom: 4,
    },
    subtitleText: {
        fontSize: 14,
        color: "#777",
    },
    formContainer: {
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
        marginBottom: 10,
    },
    inputWrapper: {
        height: 55,
        backgroundColor: "#FFF",
        borderRadius: 14,
        paddingHorizontal: 16,
        justifyContent: "center",
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 2,
    },
    textInput: {
        fontSize: 16,
        color: "#000",
        textAlignVertical: "center",
    },
    primaryButton: {
        height: 55,
        backgroundColor: "#000",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    primaryButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 30,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#DDD",
    },
    dividerText: {
        marginHorizontal: 10,
        fontSize: 14,
        color: "#777",
    },
    socialContainer: {
        gap: 16,
    },
    socialButton: {
        height: 55,
        flexDirection: "row",
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#EEE",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: 16,
    },
    socialIcon: {
        marginRight: 10,
    },
    socialButtonText: {
        fontSize: 16,
        color: "#000",
        fontWeight: "500",
    },
});