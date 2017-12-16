import React from 'react';
import TopBar from '../../components/TopBar';
import Paper from 'material-ui/Paper';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import './style.css';


const plans = [
  { credit: "100 Créditos", value: "2x R$49,99 ou R$99,99" },
  { credit: "200 Créditos", value: "2x R$95,99 ou R$189,99" },
  { credit: "500 Créditos", value: "3x R$149,99 ou R$479,99" },
]

const plansCards = plans.map((plan) => (
  <Paper
    key={plan.credit}
    zDepth={2}
    className="creditCard"
  >
    <div className="iconDiv">
      <MoneyIcon style={{ height: 70, width: 70 }} />
    </div>
    <nav>
      <h4>{plan.credit}</h4>
      <h4>{plan.value}</h4>
    </nav>
    <form className="paymentForm" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input
        type="hidden"
        name="cmd"
        value="_s-xclick"
      />
      <input
        type="hidden"
        name="hosted_button_id"
        value="HEGXEACX57LAG"
      />
      <input
        type="image"
        src="https://www.paypalobjects.com/pt_BR/BR/i/btn/btn_buynowCC_LG.gif"
        name="submit"
        alt="PayPal - A maneira fácil e segura de enviar pagamentos online!"
      />
      <img
        alt=""
        src="https://www.paypalobjects.com/pt_BR/i/scr/pixel.gif"
        width="1"
        height="1"
      />
    </form>
  </Paper>
));

const Credit = () => (
  <div className="credit">
    <TopBar title="Créditos" back userType="pro" />
    <header>
      <h4>Qual pacote de créditos você deseja ?</h4>
    </header>
    <section>
      {plansCards}
    </section>
  </div>
)

export default Credit;
