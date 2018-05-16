package co.edu.udistrital.opencv_prueba;

import android.Manifest;
import android.content.pm.PackageManager;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.SurfaceView;
import android.view.View;
import android.widget.TextView;

import org.opencv.android.BaseLoaderCallback;
import org.opencv.android.CameraBridgeViewBase;
import org.opencv.android.JavaCamera2View;
import org.opencv.android.OpenCVLoader;
import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfFloat;
import org.opencv.core.MatOfInt;
import org.opencv.core.Point;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.core.TermCriteria;
import org.opencv.imgproc.Imgproc;
import org.opencv.video.Video;

import java.io.IOException;
import java.util.Arrays;

public class MainActivity extends AppCompatActivity implements CameraBridgeViewBase.CvCameraViewListener2 {

    private static final String TAG = "MainActivity";

    // Componente de OpenCV que manipula la Camara
    JavaCamera2View javaCameraView;

    // Variables Auxiliares
    Rect rectangulo;
    Mat mRgba;
    Mat imgGray;
    Mat imgCanny;

    private Mat mTextura;
    private Mat mMascara;
    private Mat mHsv;
    private Mat mHistograma;

    private int mContenedorH;
    private int mContenedorS;
    private int mContenedorV;

    private int divAncho;
    private int divAlto;
    private int div = 4;

    private MatOfInt mContenedores;
    private MatOfFloat mRangos;
    private MatOfInt mCanales;

    private boolean tomarTextura = true;
    private boolean segTextura = false;

    BaseLoaderCallback mLoaderCallBack = new BaseLoaderCallback(this) {
        @Override
        public void onManagerConnected(int status) {
            switch (status) {
                case BaseLoaderCallback.SUCCESS: {
                    javaCameraView.enableView();
                    javaCameraView.setOnTouchListener(new View.OnTouchListener() {
                        @Override
                        public boolean onTouch(View v, MotionEvent event) {
                            Log.d(TAG,"Se ha tocado la pantalla...");
                            if(tomarTextura)
                                segTextura = true;
                            else
                                tomarTextura = true;
                            return false;
                        }
                    });
                    break;
                }
                default: {
                    super.onManagerConnected(status);
                    break;
                }
            }
        }
    };

    // Used to load the 'native-lib' library on application startup.
    static {
        System.loadLibrary("native-lib");
        if(OpenCVLoader.initDebug()) {
            Log.d(TAG, "OpenCV Cargado...");
        } else {
            Log.d(TAG, "OpenCV no Cargado...");
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Example of a call to a native method
        //TextView tv = (TextView) findViewById(R.id.sample_text);
        //tv.setText(stringFromJNI());

        javaCameraView = (JavaCamera2View) findViewById(R.id.opencv_camera);
        javaCameraView.setVisibility(SurfaceView.VISIBLE);
        javaCameraView.setCvCameraViewListener(this);
    }

    /**
     * A native method that is implemented by the 'native-lib' native library,
     * which is packaged with this application.
     */
    public native String stringFromJNI();

    @Override
    protected void onPause() {
        super.onPause();
        if(javaCameraView != null) {
            javaCameraView.disableView();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if(javaCameraView != null) {
            javaCameraView.disableView();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if(OpenCVLoader.initDebug()) {
            Log.d(TAG, "OpenCV Cargado...");
            mLoaderCallBack.onManagerConnected(BaseLoaderCallback.SUCCESS);
        } else {
            Log.d(TAG, "OpenCV no Cargado...");
            OpenCVLoader.initAsync(OpenCVLoader.OPENCV_VERSION, this, mLoaderCallBack);
        }
    }

    @Override
    public void onCameraViewStarted(int width, int height) {
        // Pruebas textura en camara del dispositivo
        mRgba = new Mat(height, width, CvType.CV_8UC4);
        imgGray = new Mat(height, width, CvType.CV_8UC1);
        imgCanny = new Mat(height, width, CvType.CV_8UC1);

        // Inicio variables de reconocimiento de texturas
        mTextura = new Mat(height, width, CvType.CV_8UC3);
        mHsv = new Mat(height, width, CvType.CV_8UC3);
        mMascara = new Mat(height, width, CvType.CV_8UC1);

        divAncho = width/4;
        divAlto = height/4;
        Imgproc.rectangle(mMascara, new Point(width/4, height/4), new Point((width/4)*3,  (height/4)*3), new Scalar(255, 255, 255), Core.FILLED);

        mContenedorH = 50;
        mContenedorS = 50;
        mContenedorV = 20;

        mContenedores = new MatOfInt (mContenedorH, mContenedorS, mContenedorV);
        mRangos = new MatOfFloat(0, 179, 0, 255, 0, 255);
        mCanales = new MatOfInt(0, 1, 2);
    }

    @Override
    public void onCameraViewStopped() {
        mRgba.release();
        imgGray.release();
        imgCanny.release();

        mTextura.release();
        mMascara.release();
        mHsv.release();
    }

    @Override
    public Mat onCameraFrame(CameraBridgeViewBase.CvCameraViewFrame inputFrame) {
        mRgba = inputFrame.rgba();
        Imgproc.cvtColor(mRgba, imgGray, Imgproc.COLOR_RGB2GRAY);
        Imgproc.cvtColor(mRgba, imgCanny, 50, 150);

        /*if (tomaTextura) {
            Imgproc.rectangle(mRgba, new Point(divAncho, divAlto), new Point(divAncho*3, divAlto*3), new Scalar(255, 255, 0));
            if(capturaTextura) {
                tomaTextura = false;
                capturaTextura =  false;
                mTextura = (Mat) inputFrame.rgba().clone();
                Imgproc.cvtColor(mTextura, mTextura, Imgproc.COLOR_RGBA2RGB);
                Imgproc.cvtColor(mTextura, mTextura, Imgproc.COLOR_RGB2HSV_FULL); //Cambio espacio de trabajo a HSV.
                mHistograma = new Mat();
                Imgproc.calcHist(Arrays.asList(mTextura), mCanales, mMascara, mHistograma, mContenedores, mRangos, false);
            }
            return mRgba;
        }

        Imgproc.cvtColor(mRgba, mHsv, Imgproc.COLOR_RGBA2RGB);
        Imgproc.cvtColor(mHsv, mHsv, Imgproc.COLOR_RGB2HSV_FULL); //Cambio espacio de trabajo a HSV.

        Mat mBackproject = new Mat();
        Imgproc.calcBackProject(Arrays.asList(mHsv), mCanales, mHistograma, mBackproject, mRangos, 1);

        return mBackproject;*/

        if (tomarTextura) {
            rectangulo = new Rect(new Point(divAncho, divAlto), new Point(divAncho*(div-1), divAlto*(div-1)));
            Imgproc.rectangle(mRgba, rectangulo.tl(), rectangulo.br(), new Scalar(255, 255, 0));
            if(segTextura) {
                tomarTextura = false;
                segTextura =  false;
                mTextura = (Mat) inputFrame.rgba().clone();
                Imgproc.cvtColor(mTextura, mTextura, Imgproc.COLOR_RGBA2RGB);
                Imgproc.cvtColor(mTextura, mTextura, Imgproc.COLOR_RGB2HSV_FULL); //Cambio espacio de trabajo a HSV.
                mHistograma = new Mat();
                Imgproc.calcHist(Arrays.asList(mTextura), mCanales, mMascara, mHistograma, mContenedores, mRangos, false);
            }
            return mRgba;
        }

        Imgproc.cvtColor(mRgba, mHsv, Imgproc.COLOR_RGBA2RGB);
        Imgproc.cvtColor(mHsv, mHsv, Imgproc.COLOR_RGB2HSV_FULL); //Cambio espacio de trabajo a HSV.

        // Pruebas espacio de trabajo con Histogramas
        Mat mBackproject = new Mat();
        Imgproc.calcBackProject(Arrays.asList(mHsv), mCanales, mHistograma, mBackproject, mRangos, 1);

        Video.CamShift(mBackproject, rectangulo, new TermCriteria(TermCriteria.EPS | TermCriteria.COUNT, 10, 1));
        Imgproc.rectangle(mRgba, rectangulo.tl(), rectangulo.br(), new Scalar(255, 255, 0));

        return mRgba;
    }
}
