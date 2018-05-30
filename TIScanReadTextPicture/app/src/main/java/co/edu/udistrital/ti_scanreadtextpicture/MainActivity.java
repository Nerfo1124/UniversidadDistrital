package co.edu.udistrital.ti_scanreadtextpicture;

import android.Manifest;
import android.content.pm.PackageManager;
import android.speech.tts.TextToSpeech;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.util.SparseArray;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.vision.CameraSource;
import com.google.android.gms.vision.Detector;
import com.google.android.gms.vision.text.TextBlock;
import com.google.android.gms.vision.text.TextRecognizer;

import java.io.IOException;
import java.util.Locale;

import co.edu.udistrital.ti_scanreadtextpicture.util.Constantes;

public class MainActivity extends AppCompatActivity {

    /**
     * Variables para la captura de texto con la ayuda
     * de la camara del dispositivo
     */
    SurfaceView cameraView;
    CameraSource cameraSource;
    TextView textView;

    /**
     * Objeto encargado de inicializar los componentes
     * de lectura de texto
     */
    TextToSpeech toSpeech;
    int result;

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        switch (requestCode) {
            case Constantes.REQ_CAMERA_PERMISSION_ID:
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    if (ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                        return;
                    }
                    try {
                        cameraSource.start(cameraView.getHolder());
                    } catch (IOException ex) {
                        Log.e(Constantes.TAG_LOGS, "Error verificando permisos sobre el recurso Camara: " + ex.getMessage(), ex);
                    }
                }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Inicializacion recursos de la camara
        cameraView = (SurfaceView) findViewById(R.id.surface_view);
        textView = (TextView) findViewById(R.id.txtTexto);

        toSpeech = new TextToSpeech(MainActivity.this, new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
            if(status == TextToSpeech.SUCCESS) {
                result = toSpeech.setLanguage(new Locale("es", "CO"));
            } else {
                Toast.makeText(getApplicationContext(), "Caracteristicas no soportadas en tu dispositivo", Toast.LENGTH_SHORT).show();
            }
            }
        });

        // Objeto encargado del reconocimiento de texto
        TextRecognizer textRecognizer = new TextRecognizer.Builder(getApplicationContext()).build();
        if (!textRecognizer.isOperational()) {
            Log.w(Constantes.TAG_LOGS, "No se tiene todas las dependencias requeridas disponibles localmente para hacer la detección.");
        } else {
            cameraSource = new CameraSource.Builder(getApplicationContext(), textRecognizer)
                    .setFacing(CameraSource.CAMERA_FACING_BACK)
                    .setRequestedPreviewSize(1280, 1024)
                    .setRequestedFps(2.0f)
                    .setAutoFocusEnabled(true)
                    .build();
            cameraView.getHolder().addCallback(new SurfaceHolder.Callback() {
                @Override
                public void surfaceCreated(SurfaceHolder holder) {
                    try {
                        if (ActivityCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                            ActivityCompat.requestPermissions(MainActivity.this,
                                    new String[]{Manifest.permission.CAMERA},
                                    Constantes.REQ_CAMERA_PERMISSION_ID);
                            return;
                        }
                        cameraSource.start(cameraView.getHolder());
                    } catch (IOException ex) {
                        ex.printStackTrace();
                    }
                }

                @Override
                public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {

                }

                @Override
                public void surfaceDestroyed(SurfaceHolder holder) {
                    cameraSource.stop();
                }
            });

            textRecognizer.setProcessor(new Detector.Processor<TextBlock>() {
                @Override
                public void release() {

                }

                @Override
                public void receiveDetections(Detector.Detections<TextBlock> detections) {
                    final SparseArray<TextBlock> items = detections.getDetectedItems();
                    if (items.size() > 0) {
                        textView.post(new Runnable() {
                            @Override
                            public void run() {
                                StringBuilder strBuilder = new StringBuilder();
                                for (int i = 0; i < items.size(); ++i) {
                                    TextBlock item = items.valueAt(i);
                                    strBuilder.append(item.getValue());
                                    strBuilder.append("\n");
                                }
                                textView.setText(strBuilder.toString());
                                readMethod(textView.getText().toString());
                            }
                        });
                    }
                }
            });
        }
    }

    private void readMethod(String text) {
        Log.i(Constantes.TAG_LOGS, "Ingresando al metodo de lectura...");
        try {
            Log.i(Constantes.TAG_LOGS, "Validacion: " + (result == TextToSpeech.LANG_MISSING_DATA) +" - "+ (result == TextToSpeech.LANG_NOT_SUPPORTED));
            if(result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                Toast.makeText(getApplicationContext(), "Caracteristicas no soportadas en tu dispositivo", Toast.LENGTH_SHORT).show();
                Log.i(Constantes.TAG_LOGS, "Caracteristicas no soportadas en tu dispositivo");
            } else {
                Log.i(Constantes.TAG_LOGS, "Se va a leer el texto: " + textView.getText().toString());
                toSpeech.speak(textView.getText().toString(), TextToSpeech.QUEUE_FLUSH, null);
                Thread.sleep(3000);
                toSpeech.stop();
            }
        } catch (Exception ex) {
            Log.e(Constantes.TAG_LOGS, "Error durante la lectura de texto: " + ex.getMessage(), ex);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if(toSpeech != null) {
            toSpeech.stop();
            toSpeech.shutdown();
        }
    }
}
