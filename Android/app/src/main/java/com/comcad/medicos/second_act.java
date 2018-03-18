package com.comcad.medicos;

import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class second_act extends AppCompatActivity {

    EditText et1,et2;
    String name,password;
    Button b;
    private FirebaseAuth mAuth;
    ProgressBar pb;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second_act);
        et1=(EditText)findViewById(R.id.editText);
        et2=(EditText)findViewById(R.id.editText2);
        b = (Button)findViewById(R.id.button2);
        mAuth = FirebaseAuth.getInstance();
        pb = (ProgressBar)findViewById(R.id.progressBar2);
        pb.setVisibility(View.GONE);
        b.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                pb.setVisibility(View.VISIBLE);
                name = et1.getText().toString();
                password = et2.getText().toString();
                login();

            }
        });

    }

    @Override
    public void onBackPressed() {

    }

    void login()
    {
        mAuth.signInWithEmailAndPassword(name, password)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            // Sign in success, update UI with the signed-in user's i
                            // nformation
                            Log.d("login", "signInWithEmail:success");
                            Intent i = new Intent(second_act.this,dashboard.class);
                            startActivity(i);

                        } else {
                            // If sign in fails, display a message to the user.

                            Toast.makeText(second_act.this, "Wrong Credentials!!!",Toast.LENGTH_SHORT).show();
                            pb.setVisibility(View.GONE);
                        }

                        // ...
                    }
                });

    }


}
