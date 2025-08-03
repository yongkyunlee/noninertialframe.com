// Temporary fix for Angular Fire RxFire type issue
declare namespace rxfire {
  namespace firestore {
    namespace lite {
      namespace interfaces {
        type CountSnapshot = any;
      }
    }
  }
}

// Patch the problematic interface
declare module 'rxfire/firestore/lite/interfaces' {
  export type CountSnapshot = any;
}