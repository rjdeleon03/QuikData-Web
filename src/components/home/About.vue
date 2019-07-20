<template>
  <div id="about" class="about">
    <div class="container">
      <h2 class="center">About</h2>
      <p>Quik Data has two components - (1) Community-Based Disaster Management and (2) the Quik Data mobile app. The CBDM will train community members on disaster risk management and help them create their own Community Disaster Preparedness Plans. This will ensure that they are capacitated to clearly and quickly communicate what support they need when a disaster strikes. The Quik Data app will serve as the reporting tool during calamities where the community can send their situation so the response will be appropriate to their needs. The app has been tested by our community partner and their feedback was crucial in the development of its design.</p>
      <p class="center">
        <img src="@/assets/icred.png" width="200">
      </p>
      <p>
        <a
          href="https://www.cdrc-phil.com/icred/"
        >Ilocos Center for Research, Empowerment, and Development (ICRED)</a>, together with the community of Vintar in Ilocos Norte, worked on the two components of this innovative solution.
      </p>
      <div class="section">
        <div class="divider"></div>
      </div>
      <h2 class="center">Consortium</h2>
      <div class="row">
        <table>
          <tr>
            <td>
              <a href="https://plan-international.org/">
                <img src="@/assets/consortium/logo_plan.png">
              </a>
            </td>
            <td>
              <a href="https://www.actionagainsthunger.org/">
                <img src="@/assets/consortium/logo_action.png">
              </a>
            </td>
            <td>
              <a href="https://startnetwork.org/">
                <img src="@/assets/consortium/logo_start.png">
              </a>
            </td>
            <td>
              <a href="https://www.ukaiddirect.org/">
                <img src="@/assets/consortium/logo_ukaid.png">
              </a>
            </td>
            <td>
              <a href="https://www.care-international.org/">
                <img src="@/assets/consortium/logo_care.png">
              </a>
            </td>
            <td>
              <a href="https://www.cdrc-phil.com/">
                <img src="@/assets/consortium/logo_cdrc.png">
              </a>
            </td>
            <td>
              <a href="http://www.cdacnetwork.org/">
                <img src="@/assets/consortium/logo_cdac.png">
              </a>
            </td>
          </tr>
        </table>
        <!-- <div class="col s12 m4 l4 xl2"></div>
        <div class="col s12 m4 l4 xl1"></div>
        <div class="col s12 m4 l4 xl2"></div>
        <div class="col s12 m3 l3 xl2">
        </div>
        <div class="col s12 m3 l3 xl2">
        </div>
        <div class="col s12 m3 l3 xl1">
        </div>
        <div class="col s12 m3 l3 xl2">
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {};
  }
};
</script>

<style>
.about .container hr {
  margin-top: 40px;
}
.about .container .row table {
  table-layout: fixed;
}
.about .container .row table tr {
  border: none;
}
.about .container .row table tr td img {
  width: 100%;
}
</style>


