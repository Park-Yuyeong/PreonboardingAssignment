import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FiUser } from "react-icons/fi";
import { RiImageEditLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  useGetUser,
  useUpdateProfile,
} from "../../hooks/queries/useAuthQueries";

import useModal from "../../store/useModal";
import useToast from "../../store/useToast";
import Button from "../common/Button";
import Input from "../common/Input";
import Loader from "../common/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const { setToast } = useToast();
  const { open, close } = useModal();

  const { data: user, isLoading, isError } = useGetUser();
  const { mutateAsync: updateProfile } = useUpdateProfile();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [newNickname, setNewNickname] = useState<string>("");
  const [imgPath, setImgPath] = useState<string>("");
  const imgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setNewNickname(user.nickname || "");
      setImgPath(user.avatar || "");
    }
  }, [user]);

  const showProfilePreview = (): void => {
    const preview = imgRef.current?.files?.[0];

    if (preview) {
      const reader = new FileReader();
      reader.readAsDataURL(preview);
      reader.onload = () => {
        setImgPath(String(reader.result));
      };
    }
  };

  const handleClickEditButton = async (): Promise<void> => {
    if (isEditMode) {
      const response = await updateProfile({
        nickname: newNickname,
        avatar: imgRef.current?.files?.[0],
      });

      setIsEditMode(!response);
    } else {
      setIsEditMode(!isEditMode);
    }
  };

  const confirmLogOut = (): void => {
    localStorage.clear();

    setToast({ label: "로그아웃 되었습니다." });
    navigate("/log-in");
    close();
  };

  const handleClickLogOutButton = (): void => {
    open({
      label: "로그아웃을 진행하시겠습니까?",
      onConfirm: confirmLogOut,
      onCancel: () => close(),
      confirmButtonContent: "로그아웃하기",
      cancelButtonContent: "취소하기",
    });
  };

  if (isLoading) return <Loader />;

  if (isError) navigate("/404");

  return (
    <div className="flex items-center gap-x-14 pb-4 border-b border-white">
      <div className="relative flex items-center justify-center border-2 border-white rounded-full w-40 h-40 aspect-square">
        {!imgPath ? (
          <FiUser color="white" size="80%" />
        ) : (
          <img
            src={imgPath}
            alt="프로필 이미지"
            className="object-cover w-full h-full rounded-full"
          />
        )}
        {isEditMode && (
          <label className="absolute bottom-1 right-1 bg-black border border-white p-1.5 rounded-full cursor-pointer hover:scale-110 transition">
            <RiImageEditLine color="white" />
            <input
              type="file"
              className="hidden"
              ref={imgRef}
              onChange={showProfilePreview}
            />
          </label>
        )}
      </div>
      <div className="h-40 flex flex-col justify-center gap-y-4">
        {isEditMode ? (
          <Input
            type="text"
            label="닉네임 수정"
            value={newNickname}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewNickname(e.target.value)
            }
          />
        ) : (
          <h4 className="font-semibold text-lg px-1">{user?.nickname}</h4>
        )}
        <div className="flex gap-x-2">
          <Button type="button" onClick={handleClickEditButton}>
            {isEditMode ? "수정 완료하기" : "내 정보 수정하기"}
          </Button>
          <Button
            type="button"
            priority={"secondary"}
            onClick={handleClickLogOutButton}
          >
            로그아웃하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
