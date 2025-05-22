import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading"

function Scanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState('back');
    const navigation = useNavigation();
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
    }, [permission]);

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleBarcodeScanned = ({ type, data }) => {
        if (!scanned) {
            setScanned(true);
            console.log(`Scanned: ${type} - ${data}`);
            navigation.replace('AddProduct', { scannedCode: data });
        }
    };

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text style={styles.messageText}>Loading camera permissions...</Text>
                <Loading/>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.messageText}>
                    We need your permission to access your camera for this to work.
                </Text>
                <Pressable style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Grant Permissions</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => Linking.openSettings()}>
                    <Text style={styles.buttonText}>Open Application Settings</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "code39", "code93", "code128", "pdf417", "qr", "aztec"],
                }}
            >
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.toggleButton} onPress={toggleCameraFacing}>
                        <Text style={styles.buttonText}>Switch Camera</Text>
                    </Pressable>
                    <Pressable style={styles.toggleButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Return</Text>
                    </Pressable>
                </View>
                {scanned && (
                    <View style={styles.scannedOverlay}>
                        <Text style={styles.scannedText}>Code scanned! Returning to form...</Text>
                    </View>
                )}
            </CameraView>
        </View>
    );
}

export default Scanner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    messageText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: 'grey',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 20,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    toggleButton: {
        padding: 15,
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginHorizontal: 5,
    },
    scannedOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 128, 0, 0.7)',
        padding: 20,
        alignItems: 'center',
    },
    scannedText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});