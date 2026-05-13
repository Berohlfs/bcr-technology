/**
 * App privacy policy routes. To add a project:
 * 1. Put HTML fragment under policies/fragments/<name>.html
 * 2. Add an entry below (query value → fragment URL + browser title)
 * 3. Share: ?<QUERY_KEY>=<your-query-value>
 */
(function (global) {
  var QUERY_KEY = "app_policy";

  /** @type {Record<string, { fragmentUrl: string, documentTitle: string }>} */
  var POLICIES = {
    "ai-health-care-receptionist": {
      fragmentUrl: "policies/fragments/ai-health-care-receptionist-privacy.html",
      documentTitle: "AI Health Care Receptionist — Privacy Policy | BCR Technology",
    },
  };

  var supportEmail = "bernardo@bcr.tec.br";

  function getActivePolicyId() {
    try {
      var id = new URLSearchParams(global.location.search).get(QUERY_KEY);
      return id && Object.prototype.hasOwnProperty.call(POLICIES, id) ? id : null;
    } catch (_) {
      return null;
    }
  }

  function initDocumentMode() {
    if (getActivePolicyId()) {
      document.documentElement.classList.add("app-policy-mode");
    }
  }

  global.BCRPolicies = {
    QUERY_KEY: QUERY_KEY,
    POLICIES: POLICIES,
    supportEmail: supportEmail,
    getActivePolicyId: getActivePolicyId,
    initDocumentMode: initDocumentMode,
  };

  initDocumentMode();
})(typeof window !== "undefined" ? window : this);
