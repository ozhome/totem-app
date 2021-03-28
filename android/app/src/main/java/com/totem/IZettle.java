// package com.totem;

// import android.app.Activity;
// import android.content.Intent;
// import android.util.Log;
// import android.widget.Toast;

// import androidx.annotation.NonNull;
// import androidx.annotation.Nullable;

// import com.facebook.react.bridge.ActivityEventListener;
// import com.facebook.react.bridge.Arguments;
// import com.facebook.react.bridge.BaseActivityEventListener;
// import com.facebook.react.bridge.Promise;
// import com.facebook.react.bridge.ReactApplicationContext;
// import com.facebook.react.bridge.ReactContext;
// import com.facebook.react.bridge.ReactContextBaseJavaModule;
// import com.facebook.react.bridge.ReactMethod;
// import com.facebook.react.bridge.WritableMap;
// import com.facebook.react.modules.core.DeviceEventManagerModule;
// import com.izettle.android.commons.state.StateObserver;
// import com.izettle.payments.android.payment.TransactionReference;
// import com.izettle.payments.android.payment.refunds.RefundsManager;
// import com.izettle.payments.android.payment.refunds.CardPaymentPayload;
// import com.izettle.payments.android.payment.refunds.RetrieveCardPaymentFailureReason;
// import com.izettle.payments.android.sdk.IZettleSDK;
// import com.izettle.payments.android.sdk.User;
// import com.izettle.payments.android.ui.payment.CardPaymentActivity;
// import com.izettle.payments.android.ui.payment.CardPaymentResult;
// import com.izettle.payments.android.ui.readers.CardReadersActivity;
// import com.izettle.payments.android.ui.refunds.RefundResult;
// import com.izettle.payments.android.ui.refunds.RefundsActivity;


// import java.util.UUID;

// public class IZettle extends ReactContextBaseJavaModule {

//   private final ReactApplicationContext reactContext;
//   private static int REQUEST_CODE_PAYMENT = 1001;
//   private static int REQUEST_CODE_REFUND = 1002;

//   private String internalTraceId;

//   IZettle(ReactApplicationContext context) {
//     super(context);
//     this.reactContext = context;
//     this.reactContext.addActivityEventListener(mActivityEventListener);

//   }

//   @NonNull
//   @Override
//   public String getName() {
//     return "IZettle";
//   }

//   @ReactMethod
//   public void openLogin(Promise promise) {
//     // TODO: Implement some actually useful functionality
//     try {

//       IZettleSDK.Instance.getUser().login(getCurrentActivity());

//       IZettleSDK.Instance.getUser().getState().addObserver(new StateObserver<User.AuthState>() {
//         @Override
//         public void onNext(User.AuthState authState) {
//           if(authState instanceof User.AuthState.LoggedIn) {
//             Log.d("authState", "Logado");
//             sendEvent(reactContext, "izettle-login",null);
//           }
//         }
//       });

//       promise.resolve(true);

//     }catch (Exception error) {
//       promise.reject("no_events", error.getMessage(),error.getCause());

//     }
//   }

//   @ReactMethod
//   public void openLogout(Promise promise) {
//     // TODO: Implement some actually useful functionality
//     try {

//       IZettleSDK.Instance.getUser().logout();

//       promise.resolve(true);

//     }catch (Exception error) {
//       promise.reject("no_events", error.getMessage(),error.getCause());

//     }
//   }

//   @ReactMethod
//   public void openSettings(Promise promise) {
//     // TODO: Implement some actually useful functionality
//     try {
//       Intent intent = CardReadersActivity.newIntent(reactContext.getApplicationContext());
//       intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//       this.reactContext.getApplicationContext().startActivity(intent);
//       promise.resolve(true);

//     }catch (Exception error) {
//       promise.reject("no_events", error.getMessage(),error.getCause());

//     }
//   }

//   @ReactMethod
//   public void openPayment(String amount,Promise promise) {
//     // TODO: Implement some actually useful functionality
//     try {
//       internalTraceId = UUID.randomUUID().toString();
//       long amountValue = Long.parseLong(amount);

//       boolean isInstalments = Float.parseFloat(amount) >= 15000;

//       mPromisePayment = promise;

//       TransactionReference reference = new TransactionReference.Builder(internalTraceId)
//         .put("PAYMENT_EXTRA_INFO", "Started from home screen")
//         .build();

//       Intent intent = new CardPaymentActivity.IntentBuilder(reactContext.getApplicationContext())
//         .amount(amountValue)
//         .reference(reference)
//         .enableTipping(false) // Only for markets with tipping support
//         .enableInstalments(isInstalments) // Only for markets with installments support
//         .enableLogin(true) // Mandatory to set
//         .build();

//       getCurrentActivity().startActivityForResult(intent, REQUEST_CODE_PAYMENT);

//     }catch (Exception error) {
//       promise.reject("no_events", error.getMessage(),error.getCause());

//     }
//   }

//   @ReactMethod
//   public void openRefund(String internalTraceId, Promise promise) {

//     mPromisePayment = promise;

//     IZettleSDK.Instance.getRefundsManager().retrieveCardPayment(internalTraceId, new RefundCallback());
//   }

//   private Promise mPromisePayment;

//   private class RefundCallback implements RefundsManager.Callback<CardPaymentPayload, RetrieveCardPaymentFailureReason> {

//         @Override
//         public void onFailure(RetrieveCardPaymentFailureReason reason) {
//           mPromisePayment.reject("no_events", "Payment not found");
//         }

//         @Override
//         public void onSuccess(CardPaymentPayload payload) {
//           TransactionReference reference = new TransactionReference.Builder(payload.getReferenceId())
//             .put("REFUND_EXTRA_INFO", "Started from home screen")
//             .build();

//           Intent intent = new RefundsActivity.IntentBuilder(reactContext.getApplicationContext())
//             .cardPayment(payload)
//             .reference(reference)
//             .build();

//            getCurrentActivity().startActivityForResult(intent, REQUEST_CODE_REFUND);
//         }
//     }

//   private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
//     @Override
//     public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
//       if (mPromisePayment != null) {

//         super.onActivityResult(activity, requestCode, resultCode, data);
//         if (requestCode == REQUEST_CODE_PAYMENT && data != null) {
//           CardPaymentResult result = data.getParcelableExtra(CardPaymentActivity.RESULT_EXTRA_PAYLOAD);
//           if (result instanceof CardPaymentResult.Completed) {
//             WritableMap params = Arguments.createMap();
//             params.putString("status", "success");
//             params.putString("hash", internalTraceId);

//             mPromisePayment.resolve(params);
//           } else if (result instanceof CardPaymentResult.Canceled) {
//             mPromisePayment.reject("no_events", "Payment Cancelled");
//           } else if (result instanceof CardPaymentResult.Failed) {
//             mPromisePayment.reject("no_events", "Payment Failed");
//           }
//         }

//         if (requestCode == REQUEST_CODE_REFUND && data != null) {
//           RefundResult result = data.getParcelableExtra(RefundsActivity.RESULT_EXTRA_PAYLOAD);
//           if (result instanceof RefundResult.Completed) {
//             mPromisePayment.resolve(true);
//           } else if (result instanceof RefundResult.Canceled) {
//             mPromisePayment.reject("no_events", "Refund Cancelled");
//           } else if (result instanceof RefundResult.Failed) {
//             mPromisePayment.reject("no_events", "Refund Failed");
//           }
//         }
//       }
//     }
//   };

//   private void sendEvent(ReactContext reactContext,
//                          String eventName,
//                          @Nullable WritableMap params) {
//     reactContext
//       .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//       .emit(eventName, params);
//   }
// }
