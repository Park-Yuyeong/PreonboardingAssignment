import { useMutation } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { ChangeEvent, useRef, useState } from "react";
import { FiUser } from "react-icons/fi";
import { RiImageEditLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import { useToast } from "../../providers/ToastProvider";
import useAuthStore from "../../store/useAuthStore";
import {
  ErrorResponse,
  ProfileRequest,
  ProfileResponse,
} from "../../types/auth.type";
import Button from "../common/Button";
import Input from "../common/Input";

const Profile = () => {
  const navigate = useNavigate();
  const { nickname, avatar, setNickname, setAvatar } = useAuthStore();
  const toast = useToast();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [newNickname, setNewNickname] = useState<string>(nickname);
  const [imgPath, setImgPath] = useState<string>(avatar);
  const imgRef = useRef<HTMLInputElement>(null);

  const { mutate: updateProfile } = useMutation({
    mutationFn: (data: ProfileRequest) => api.auth.updateProfile(data),
    onSuccess: (response: ProfileResponse) => {
      setNickname(response.nickname);
      setAvatar(response.avatar ?? avatar);

      setIsEditMode(false);

      toast.on({ label: "내 정보를 수정했습니다!" });
    },
    onError: (error: AxiosError<ErrorResponse> | Error) => {
      if (isAxiosError(error)) {
        toast.on({
          label: error.response?.data.message || "내 정보 수정에 실패했습니다.",
          state: "danger",
        });
      } else {
        toast.on({ label: error.message, state: "danger" });
      }

      setIsEditMode(true);
    },
  });

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

  const handleClickEditButton = (): void => {
    if (isEditMode) {
      updateProfile({
        nickname: newNickname,
        avatar: imgRef.current?.files?.[0],
      });
    } else {
      setIsEditMode(!isEditMode);
    }
  };

  const handleClickLogOutButton = (): void => {
    const check = confirm("로그아웃을 진행하시겠습니까?");
    if (check) {
      setNickname("");
      setAvatar("");

      localStorage.clear();

      toast.on({ label: "로그아웃 되었습니다." });
      navigate("/log-in");
    }
  };

  return (
    <div className="flex items-center gap-x-14">
      <div className="relative flex items-center justify-center border-2 border-white rounded-full w-40 h-40 aspect-square">
        {imgPath.length === 0 ? (
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
          <h4 className="font-semibold text-lg px-1">{nickname}</h4>
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
