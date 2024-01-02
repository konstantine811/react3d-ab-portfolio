import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { useTranslation } from "react-i18next";
// models
import { LangType } from "@models/lang.model";
import { useDispatch } from "react-redux";
import { onChangeLanguage } from "@store/slices/changeLanguageSlice";

const SelectLangButton = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set([LangType.en])
  );
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");
  const handleChangeLanguage = (lang: LangType) => {
    dispatch(onChangeLanguage(lang));
    i18n.changeLanguage(lang);
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="flat" className="capitalize">
          <span className="text-xs text-primary">{t("header.lang.title")}</span>{" "}
          {selectedKeys}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Select language"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        disabledKeys={selectedKeys}
        onSelectionChange={(keys) => {
          const keysSet = keys as Set<LangType>;
          setSelectedKeys(keysSet);
          handleChangeLanguage(keysSet.values().next().value);
        }}
      >
        {Object.values(LangType).map((i) => {
          return <DropdownItem key={i}>{i}</DropdownItem>;
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SelectLangButton;
