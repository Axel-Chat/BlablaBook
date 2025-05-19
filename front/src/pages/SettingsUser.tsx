// user settings component for managing profile information
import type { IUser, IUserUpdate } from "../@types";
import { useState, useEffect, useRef } from "react";
import { getOneUser, updateUser, deleteUser } from "../api/apiUser";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../utils/store/useAuthStore";
import { IError } from "../@types/auth";
import { toastError } from "../utils/toast/toastError";
import { toastSuccess } from "../utils/toast/toaster";

const SettingsUser = () => {
  const navigate = useNavigate();
  // main state variables for user data
  const [userData, setUserData] = useState<IUser | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  //const [emailError, setEmailError] = useState(false);
  // modal visibility states
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  // edit mode toggles for form fields
  const [editUserName, setEditUserName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  // password related states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // input ref to handle focus
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  // fetch user data on component mount
  useEffect(() => {
    const loadData = async () => {
      const oneUser = await getOneUser();

      if (!oneUser) {
        navigate("/404");
        return;
      }
      setUserData(oneUser);

      setUsername(oneUser.name);
      setEmail(oneUser.email);
    };
    loadData();
  }, []);

  // handle form submission - show confirmation modal
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // open confirmation modal
    setConfirmationModal(true);
  };

  // process the update after confirmation
  const handleConfirmation = async (confirm: boolean) => {
    if (!confirm) {
      setConfirmationModal(false);
      return;
    }

    // prepare data object for update
    const updatedData: IUserUpdate = {};

    // only add fields that changed
    if (username !== userData?.name) updatedData.name = username;
    if (email !== userData?.email) updatedData.email = email;

    // handle password update
    if (editPassword) {
      if (newPassword !== confirmPassword) {
        setPasswordError("Les mots de passe ne correspondent pas.");
        return;
      }
      updatedData.currentPassword = currentPassword;
      updatedData.password = newPassword;
      updatedData.confirmPassword = confirmPassword;
    }

    try {
      // only send request if there are changes
      if (Object.keys(updatedData).length > 0) {
        await updateUser(updatedData);
        const updatedUser = await getOneUser();
        if (!updatedUser) {
          navigate("/404");
          return;
        }
        setUserData(updatedUser);
        // update user state across all components
        useAuthStore.getState().setUser(updatedUser);
      }

      // reset form fields after successful update
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setEditPassword(false);
      setEditEmail(false);
      setConfirmationModal(false);
      toastSuccess("Profil mis à jour avec succès !");
    } catch (error: unknown) {
      // handle api errors
      const apiError = error as IError;

      if (apiError.errors && apiError.errors.length > 0) {
        toastError(apiError.errors);
      } else {
        toastError(apiError.message || "Une erreur est survenue.");
      }

      setConfirmationModal(false); // avoid modal staying open
    }
  };

  // handle account deletion
  const handleDeleteAccount = async () => {
    await deleteUser();

    // redirect to home page after account deletion
    navigate("/");
  };

  // toggle username edit mode and focus input when enabled
  const handleUsernameEdit = () => {
    setEditUserName(!editUserName);

    // focus and select text when edit mode is activated
    if (!editUserName) {
      // setTimeout used to ensure dom is updated before focusing
      setTimeout(() => {
        if (usernameInputRef.current) {
          usernameInputRef.current.focus();
          usernameInputRef.current.select();
        }
      }, 0);
    }
  };

  // toggle email edit mode and focus input when enabled
  const handleEmailEdit = () => {
    setEditEmail(!editEmail);

    // focus and select text when edit mode is activated
    if (!editEmail) {
      setTimeout(() => {
        if (emailInputRef.current) {
          emailInputRef.current.focus();
          emailInputRef.current.select();
        }
      }, 0);
    }
  };

  return (
    <>
      <div className="w-full px-4">
        <div className="px-4 sm:px-10 pt-5 font-title">
          {/* back button */}
          <Link to="/profile">
            <button
              className="text-blue-900 hover:underline dark:text-yellow-500"
              aria-label="retour"
            >
              ← Retour
            </button>
          </Link>
        </div>
        <div className="flex flex-col w-full  items-center font-title">
          {/* user profile section */}
          <div className="flex mb-5 items-center">
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-4xl mb-4">
              👤
            </div>
            <div className="flex flex-col">
              <p className="font-bold mt-8 ml-20 ">{userData?.name}</p>
              <p className="font-bold mt-8 ml-20">
                Nombre de livres lus :{" "}
                <span className="font-body font-normal tracking-wider">
                  {" "}
                  {userData?.books_already_read.length}{" "}
                </span>
              </p>
              <p className="font-bold mt-8 ml-20">
                Nombre de pages lues :{" "}
                <span className="font-body font-normal tracking-wider">
                  {userData?.books_already_read.reduce(
                    (total, book) => total + book.page_count,
                    0
                  )}
                </span>
              </p>
            </div>
          </div>

          {/* settings form */}
          <div className="font-body [word-spacing:2px] tracking-widest w-full max-w-md px-4">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md flex flex-col gap-4 pt-10 "
            >
              {/* username field with edit toggle */}
              <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                <input
                  ref={usernameInputRef}
                  className="w-120 my-1 focus:outline-none placeholder-placeholder"
                  type="text"
                  id="login-username"
                  name="username"
                  placeholder="Nouveau pseudo"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  readOnly={!editUserName}
                />
                <button
                  type="button"
                  className="ml-2 text-gray-500 text-sm"
                  onClick={handleUsernameEdit}
                >
                  <i
                    className={
                      editUserName
                        ? "fa-solid fa-hourglass-half text-xl"
                        : "fa-solid fa-pencil text-xl"
                    }
                  ></i>
                </button>
              </div>
              {/* email field with edit toggle */}
              <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                <input
                  ref={emailInputRef}
                  className="w-120 my-1 focus:outline-none placeholder-placeholder"
                  type="email"
                  id="register-email"
                  name="email"
                  placeholder="Nouvel Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={!editEmail}
                />
                <button
                  type="button"
                  className="ml-2 text-gray-500 text-sm"
                  onClick={handleEmailEdit}
                >
                  <i
                    className={
                      editEmail
                        ? "fa-solid fa-hourglass-half text-xl"
                        : "fa-solid fa-pencil text-xl"
                    }
                  ></i>
                </button>
              </div>

              {/* password field with edit toggle */}
              <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                <input
                  className="w-120 my-1 focus:outline-none placeholder-placeholder"
                  type="password"
                  placeholder="Nouveau mot de passe"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  readOnly={!editPassword}
                />
                <button
                  type="button"
                  className="ml-2 text-gray-500 text-sm"
                  onClick={() => setEditPassword(!editPassword)}
                >
                  <i
                    className={
                      editPassword
                        ? "fa-solid fa-hourglass-half text-xl"
                        : "fa-solid fa-pencil text-xl"
                    }
                  ></i>
                </button>
              </div>
              {/* additional password fields shown when editing password */}
              {editPassword && (
                <>
                  <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                    <input
                      className="w-120 my-1 focus:outline-none placeholder-placeholder"
                      type="password"
                      placeholder="Confirmer le mot de passe"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                    <input
                      className="w-120 my-1 focus:outline-none placeholder-placeholder"
                      type="password"
                      placeholder="Mot de passe actuel"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                </>
              )}
              {/* display password error message if any */}
              {passwordError && <p className="text-red-500">{passwordError}</p>}

              {/* save button */}
              <button
                className="mt-4 bg-white text-black border py-2 px-4 rounded hover:bg-gray-200 font-title tracking-normal"
                type="submit"
              >
                Sauvegarder
              </button>
            </form>
          </div>

          {/* confirmation modal */}
          {confirmationModal && (
            <div className="fixed center flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-lg m-4 max-w-md w-full">
                <p>Êtes-vous sûr de vouloir sauvegarder ces modifications ?</p>

                {/* show changed email if modified */}
                {email !== userData?.email && (
                  <div className="mt-4">
                    <p>
                      <strong>Nouvel Email : </strong>
                      {email}
                    </p>
                  </div>
                )}

                <div className="flex gap-4 mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleConfirmation(false)}
                  >
                    Annuler
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => handleConfirmation(true)}
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* account deletion confirmation modal */}
          {deleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-body p-6 rounded shadow-lg">
                <p className="text-lg font-semibold">
                  Es-tu sûr de vouloir supprimer ton compte ? Cette action est
                  irréversible.
                </p>
                <div className="flex gap-4 mt-4 justify-end">
                  <button
                    className="bg-white-300 border text-black px-4 py-2 rounded"
                    onClick={() => setDeleteModal(false)}
                  >
                    Annuler
                  </button>
                  <Link
                    to="/logout"
                    className="bg-red-600 border text-white px-4 py-2 rounded"
                    onClick={handleDeleteAccount}
                    type="button"
                  >
                    Supprimer
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* bottom action buttons */}
          <div className="flex gap-20 mt-12 mb-12">
            <Link
              to="/logout"
              className="bg-white text-black rounded px-4 py-2 mt-4 border hover:bg-gray-200 text-center flex items-center"
              type="button"
            >
              Se déconnecter
            </Link>
            <button
              className="bg-black text-white rounded px-4 py-2 mt-4 border-none hover:bg-gray-600 text-center"
              type="button"
              onClick={() => setDeleteModal(true)}
            >
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsUser;
