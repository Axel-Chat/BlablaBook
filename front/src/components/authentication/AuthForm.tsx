import { ReactNode } from "react";

type AuthFormProps = {
  title: string;
  children: ReactNode;
};

/**
 * AuthForm component that provides a consistent layout for authentication forms.
 *
 * @param {Object} param - Component props.
 * @param {string} param.title - The title to display at the top of the form.
 * @param {ReactNode} param.children - The form content to be rendered inside the layout.
 * @returns {JSX.Element} - The rendered authentication form layout.
 */
const AuthForm = ({ title, children }: AuthFormProps) => {
  return (
    <div className="flex items-center justify-center bg-body">
      <form className="p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold sm:-ml-20 mb-6 text-left font-title">{title}</h2>
        {children}
      </form>
    </div>
  );
};

export default AuthForm;
