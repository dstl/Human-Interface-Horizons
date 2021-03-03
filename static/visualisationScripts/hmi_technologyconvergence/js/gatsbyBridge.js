var rootPath;

function onClickToggle(id, groupId, state) {
  if (id === "change-view-style") {
    if (state) {
      changeViewStyle({value: "x"})
    }
    else {
      changeViewStyle({value: "xTime"})
    }
  }
  if (id === "contract-time-axis") {
    expandTimeAxis({value: state ? "time" : "data"})
  }
}

function renderTechnologyConvergence(params, prefixedPath, navigateToTechnologyDetailPage) {
  rootPath = prefixedPath;
  navFunc = navigateToTechnologyDetailPage;

  loadData().then((data) => {
    onload()
    aleph.sourceTechnologyArray = []
    var paramArray = (params.technologies || "").split(",")
    for (var param of paramArray) {
      const techString = technologies[param].technology
      aleph.sourceTechnologyArray.push(techString)
    }
    submitSelection()  
  });
}