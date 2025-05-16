import { useState, useEffect } from "react";
import AuthForm from "./AuthForm";
import { IRegister } from "../../@types/auth";
import PasswordField from "./PasswordField";

export interface IRegisterProps {
  data: IRegister;
  onChange: (data: IRegister) => void;
  onSubmit: () => void;
}

interface PasswordRules {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  noSpaces: boolean;
}

/**
 * Register component for user registration.
 *
 * @param {Object} param - Component props.
 * @param {IRegister} param.data - Registration form data.
 * @param {Function} param.onChange - Function to handle form data changes.
 * @param {Function} param.onSubmit - Function to handle form submission.
 * @returns {JSX.Element} - The rendered registration form.
 */
const Register = ({ data, onChange, onSubmit }: IRegisterProps) => {
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState<PasswordRules>({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
    noSpaces: false,
  });

  /**
   * Effect hook to update password validation state based on the password input.
   */
  useEffect(() => {
    if (data.password) {
      setPasswordValidation({
        minLength: data.password.length >= 12,
        hasUppercase: /[A-Z]/.test(data.password),
        hasLowercase: /[a-z]/.test(data.password),
        hasNumber: /[0-9]/.test(data.password),
        hasSpecial: /[^A-Za-z0-9\s]/.test(data.password),
        noSpaces: !/\s/.test(data.password),
      });
    } else {
      setPasswordValidation({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecial: false,
        noSpaces: false,
      });
    }
  }, [data.password]);

  /**
   * Function to render a validation mark based on the validation state.
   *
   * @param {boolean} isValid - The validation state.
   * @returns {JSX.Element} - A span element with a checkmark or dot based on the validation state.
   */
  const renderValidationMark = (isValid: boolean) => {
    return isValid ? (
      <span className="text-green-500 ml-1">
        <i className="fa-solid fa-check"></i>
      </span>
    ) : (
      <span className="text-gray-400 ml-1"></span>
    );
  };

  const passwordRulesList = [
    { key: "minLength", label: "Au moins 12 caractères" },
    { key: "hasUppercase", label: "Au moins une lettre majuscule" },
    { key: "hasLowercase", label: "Au moins une lettre minuscule" },
    { key: "hasNumber", label: "Au moins un chiffre" },
    { key: "hasSpecial", label: "Au moins un caractère spécial" },
    { key: "noSpaces", label: "Pas d'espaces" },
  ] as const;

  return (
    <AuthForm title="M'inscrire">
      <div className="mb-4 font-body tracking-wider">
        <label htmlFor="registerName" className="block mb-1 text-lg">
          Nom
        </label>
        <input
          type="text"
          id="registerName"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          className="w-full border border-gray-300 p-2 placeholder-placeholder rounded focus:outline-none"
          placeholder="Nom"
        />
      </div>

      <div className="mb-4 font-body tracking-wider">
        <label htmlFor="email" className="block mb-1 text-lg">
          Adresse email
        </label>
        <input
          type="email"
          id="registerEmail"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          className="w-full border border-gray-300 p-2 placeholder-placeholder rounded focus:outline-none"
          placeholder="email@example.com"
        />
      </div>

      <div className="mb-4 font-body tracking-wider">
        <label htmlFor="registerPassword" className="block mb-1 text-lg">
          Mot de passe
        </label>
        <PasswordField
          id="registerPassword"
          name="password"
          value={data.password}
          onChange={(e) => onChange({ ...data, password: e.target.value })}
          onFocus={() => setShowPasswordRules(true)}
          onBlur={() => setShowPasswordRules(false)}
          placeholder="Mot de passe"
        />

        {/* Display password rules only when the input is in focus */}
        {showPasswordRules && (
          <div className="mt-2 text-xs bg-gray-50 p-3 rounded border border-gray-200">
            <p className="font-medium mb-2">Le mot de passe doit contenir :</p>
            <ul className="space-y-1">
              {passwordRulesList.map((rule) => {
                const isValid = passwordValidation[rule.key];
                return (
                  <li
                    key={rule.key}
                    className={isValid ? "text-green-600" : "text-gray-600"}
                  >
                    {renderValidationMark(isValid)} {rule.label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="mb-6 font-body tracking-wider">
        <label htmlFor="confirmPassword" className="block mb-1 text-lg">
          Confirmation
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={data.confirmPassword}
          onChange={(e) =>
            onChange({ ...data, confirmPassword: e.target.value })
          }
          className="w-full border border-gray-300 p-2 placeholder-placeholder rounded focus:outline-none"
          placeholder="Confirmer le mot de passe"
        />

        {/* Checking that passwords match */}
        {data.password && data.confirmPassword && (
          <div
            className={`mt-1 text-xs ${
              data.password === data.confirmPassword
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {data.password === data.confirmPassword ? (
              <span>
                <i className="fa-solid fa-check"></i> Les mots de passe
                correspondent
              </span>
            ) : (
              <span>
                <i className="fa-solid fa-xmark"></i> Les mots de passe ne
                correspondent pas
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-6 rounded cursor-pointer dark:bg-gray-600 dark:hover:bg-gray-400"
          onClick={onSubmit}
        >
          Inscription
        </button>
      </div>
    </AuthForm>
  );
};

export default Register;
