import React, { useContext, useRef } from "react";
import { AuthContext } from "@/context/auth/AuthProvider";
import { useRouter } from "next/router";

const SignUpForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { signUpHandler } = useContext(AuthContext);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: バリデーションチェックを入れる
    if (!emailRef.current || !passwordRef.current) {
      return;
    }

    await signUpHandler({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    router.push("/sign-in");
  };

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        onSubmitHandler(e);
      }}
    >
      <div>
        {/* htmlFor: htmlタグの属性forのこと. */}
        {/* labelに付与することで、同じ内容のid属性を持つ要素を関連付けられる. */}
        <label htmlFor="email">メールアドレス</label>
        <input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          placeholder="メールアドレスを入力してください。"
        />
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <input
          ref={passwordRef}
          id="password"
          name="password"
          type="password"
          placeholder="パスワードを入力してください。"
        />
      </div>
      <button type="submit">登録</button>
    </form>
  );
};

export default SignUpForm;
