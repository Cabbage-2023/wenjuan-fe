import { ComponentInfoType } from "./index";
import { ComponentsStateType } from "./index";

export function getNextSelectedId(
  fe_id: string,
  componentList: Array<ComponentInfoType>
) {
  // 过滤出可见组件
  const visibleComponentList=componentList.filter((c)=>!c.isHidden)
  const index = visibleComponentList.findIndex((item) => item.fe_id === fe_id);
  if (index === -1) return "";

  const length = visibleComponentList.length;
  // 1. 如果列表里就剩这一个组件，删了就没了
  if (length <= 1) return "";
  // 2. 如果要删除的是最后一个，返回前一个的 ID
  if (index + 1 === length) {
    return visibleComponentList[index - 1].fe_id;
  }
  // 3. 其他情况（删中间的），返回下一个的 ID
  return visibleComponentList[index + 1].fe_id;
}

export function insertNewComponent(
  state: ComponentsStateType,
  newComponent: ComponentInfoType
) {
  const { selectedId, componentList } = state;
      const index = componentList.findIndex(
        (item) => item.fe_id === selectedId
      );
      if (index === -1) {
        //如果没有选中的组件，直接添加到列表末尾
        componentList.push(newComponent);
      } else {
        //如果有选中的组件，添加到选中组件的后面
        componentList.splice(index + 1, 0, newComponent);
      }

      //添加组件后，将选中的组件设置为新添加的组件
      state.selectedId = newComponent.fe_id;
}