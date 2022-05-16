package neko.project.meusgastos.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

//Receives a password as a usual string and returns it encrypted

public class encryptPassword {

    public String encrypt(String string) throws NoSuchAlgorithmException, UnsupportedEncodingException {

        MessageDigest algorithm = MessageDigest.getInstance("MD5");
        byte messageDigest[] = algorithm.digest(string.getBytes("UTF-8"));

        String a = new String(messageDigest, "UTF-8");

        return a;
    }

}