#include <jni.h>
#include <string>

extern "C" JNIEXPORT jstring

JNICALL
Java_co_edu_udistrital_opencv_1prueba_MainActivity_stringFromJNI(
        JNIEnv *env,
        jobject /* this */) {
    std::string hello = "Hello from C++";
    return env->NewStringUTF(hello.c_str());
}
