package com.melody.simLocation;

import android.content.Context;
import android.telephony.CellIdentityCdma;
import android.telephony.CellIdentityGsm;
import android.telephony.CellInfo;
import android.telephony.CellInfoCdma;
import android.telephony.CellInfoGsm;
import android.telephony.TelephonyManager;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by melody on 06/08/2017.
 */

public class RNSimLocationModule extends ReactContextBaseJavaModule {

  ReactApplicationContext reactContext;

  public RNSimLocationModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNSimLocation";
  }

  @Nullable
  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    TelephonyManager telManager = (TelephonyManager) this.reactContext.getSystemService(Context.TELEPHONY_SERVICE);
    int phoneType = telManager.getPhoneType();
    List<CellInfo> cellInfoList = telManager.getAllCellInfo();
    for (CellInfo cellInfo : cellInfoList) {
      if (phoneType == TelephonyManager.PHONE_TYPE_GSM) {
        CellInfoGsm gsmCellInfo = (CellInfoGsm) cellInfo;
        CellIdentityGsm identityGsm = gsmCellInfo.getCellIdentity();
        int cid = identityGsm.getCid();
        int lac = identityGsm.getLac();
        constants.put("cid", cid);
        constants.put("lac", lac);
        Toast.makeText(reactContext, "GSM Cell Info, cid is: " + cid + ", lac is: " + lac, Toast.LENGTH_LONG);
      } else if (phoneType == TelephonyManager.PHONE_TYPE_CDMA) {
        CellInfoCdma cdmaCellInfo = (CellInfoCdma) cellInfo;
        CellIdentityCdma identityCdma = cdmaCellInfo.getCellIdentity();
        int lat = identityCdma.getLatitude();
        int lng = identityCdma.getLatitude();
        constants.put("lat", lat);
        constants.put("lng", lng);
        Toast.makeText(reactContext, "CDMA Cell Info, lat is: " + lat + ", lng is: " + lng, Toast.LENGTH_LONG);
      }
    }

    return constants;

  }

}
