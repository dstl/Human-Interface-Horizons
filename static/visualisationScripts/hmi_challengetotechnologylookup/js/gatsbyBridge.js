var rootPath;

function renderChallengeToTechnology(params, prefixedPath, navigateToTechnologyDetailPage) {
  rootPath = prefixedPath;  
  navFunc = navigateToTechnologyDetailPage;
  
  loadData().then((data) => {
    onload()
    aleph.sourceTechnologyArray[0] = params.family  
    submitSelection()  
  });
}
