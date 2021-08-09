import arrow from '../img/arrow.png';

export const CustomContainer = ({
  parent,
  self
}) => {
  return (
    <div
      key={parent.id}
      className="container"
      onClick={(event) => {
        event.stopPropagation();
        self.appBloc.toggleCheckBox(parent.id)
      }}>
      <div className="header">
        <div className="left-content">
          <input type="checkbox" checked={parent.isChecked} onChange={() => { }} />
          <label>{parent.name}</label>
        </div>
        {parent.children.length > 0 &&
          <div className="icon-wrapper"
            onClick={(event) => {
              event.stopPropagation();
              self.appBloc.toggleRowExpansion(parent.id)
            }}>
            <img
              className={parent.isExpanded ? "icon icon-down" : "icon icon-up"}
              src={arrow} >
            </img>
          </div>
        }
      </div>
      <div className="container-body"
        style={{
          display: parent.isExpanded ? 'flex' : 'none',
          height: parent.isExpanded ? '100%' : '0',
          flexDirection: 'column'
        }}>
        {
          parent.children.length > 0 ?
            parent.children.map((childrenParent) => {
              return (
                <CustomContainer
                  self={self}
                  key={childrenParent.id}
                  parent={childrenParent}
                />
              )
            })
            : null
        }
      </div>
    </div>
  )
}