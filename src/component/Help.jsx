import React from "react";
import Keboard from "./common/keyboard";
import "../utilize/logicFunc";

export default function Help() {
  return (
    <section className="">
      {" "}
      <section>
        <h1>Guide</h1>
        <h3>
          If you did not understand what the hell this site is, you have come to
          the right place
        </h3>
        <p>
          This site is a logic study tutorial, which focuses on natural
          deduction for "Propositional Calculus". Already now you can try to
          solve the exercises below the "examples" but as long as you are not
          registered, your will not be saved in the system. To do this, you must
          register under the "Register" tab. You can register as a teacher and
          thus you will have the ability to create exercises yourself in natural
          deduction. Or register as a student of one of the teachers and then
          you will be able to solve the exercises that the same teacher creates.
          But before all that, you need to be proficient in natural deduction,
          for that I have compiled this short guide.
        </p>
      </section>
      <section>
        <h2>What is "Propositional calculus"?</h2>
        <p>
          Propositional calculus is a branch of logic. It is also called
          propositional logic, statement logic, sentential calculus, sentential
          logic, or sometimes zeroth-order logic. It deals with propositions
          (which can be true or false) and relations between propositions,
          including the construction of arguments based on them. Compound
          propositions are formed by connecting propositions by logical
          connectives. Propositions that contain no logical connectives are
          called atomic propositions.
        </p>
        <p>
          In this table you can see the list of logical conectives. For those of
          you who are familiar whit coding, they are probably be familiar:
          <table className="table">
            <thead>
              <tr>
                <th>Syntax</th>
                <th>name</th>
                <th>world</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>∧</td>
                <td>conjunction</td>
                <td>and</td>
              </tr>
              <tr>
                <td>∨</td>
                <td>disjunction</td>
                <td>or</td>
              </tr>
              <tr>
                <td>⇒</td>
                <td>implication</td>
                <td>if</td>
              </tr>
              <tr>
                <td>⇔</td>
                <td>biconditional</td>
                <td>if and only if</td>
              </tr>
              <tr>
                <td>¬</td>
                <td>negation</td>
                <td>not</td>
              </tr>
            </tbody>
          </table>
        </p>
      </section>
      <section>
        <h2>What is "Natural deduction"?</h2>
        <p>
          In logic and proof theory, natural deduction is a kind of proof
          calculus in which logical reasoning is expressed by inference rules
          closely related to the "natural" way of reasoning. This contrasts with
          Hilbert-style systems, which instead use axioms as much as possible to
          express the logical laws of deductive reasoning.
        </p>
        <div>
          In this tutorial you must be familiar with the following inference
          rules:
          <table className="table">
            <thead>
              <tr>
                <th>Syntax</th>
                <th>Name</th>
                <th>Schema</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>I∧</th>
                <td>Introduction Conjunction</td>
                <td>δ, φ ⊢ δ∧φ</td>
                <td>Choose 2 propositionals and Connect them with '∧'</td>
              </tr>
              <tr>
                <th>E∧</th>
                <td>Elimination Conjunction</td>
                <td>δ∧φ ⊢ δ, φ</td>
                <td>
                  Choose 1 propositional with main connective '∧' and separate
                  them the one side of it
                </td>
              </tr>
              <tr>
                <th>I∨</th>
                <td>Introduction Disjunction</td>
                <td>δ ⊢ δ∨φ</td>
                <td>
                  Choose 1 propositional and create another one, incert ∨ bitwin
                  them
                </td>
              </tr>
              <tr>
                <th>E∨</th>
                <td>Elimination Disjunction</td>
                <td>δVφ, δ⇒ψ, φ⇒ψ ⊢ ψ</td>
                <td>Choose 3 propositional whit main conective V,⇒,⇒</td>
              </tr>
              <tr>
                <th>I⇒</th>
                <td>Introduction Implication</td>
                <td>δ...φ ⊢ δ⇒φ</td>
                <td>Choose 2 propositional and incert ⇒</td>
              </tr>
              <tr>
                <th>E⇒</th>
                <td>Elimination Implication</td>
                <td>δ, δ⇒φ ⊢ φ</td>
                <td>
                  Choose 2 propositional one whit ⇒ conective and return the
                  sifa
                </td>
              </tr>
              <tr>
                <th>I⇔</th>
                <td>Introduction Biconditional</td>
                <td>δ⇒φ, φ⇒δ ⊢ δ⇔φ</td>
                <td>
                  Choose 2 propositional whit main conective ⇒ and replace whit
                  ⇔
                </td>
              </tr>
              <tr>
                <th>E⇔</th>
                <td>Elimination Biconditional</td>
                <td>δ⇔φ ⊢ δ⇒φ, φ⇒δ</td>
                <td>
                  Choose 1 propositional whit main conective ⇔ and replace the
                  conective whit ⇒
                </td>
              </tr>
              <tr>
                <th>I¬</th>
                <td>Introduction Negation</td>
                <td>δ...φ¬∧φ ⊢ δ¬</td>
                <td>
                  Choose 2 propositional thet the one is an explicit
                  contradiction and add ¬ to the second
                </td>
              </tr>
              <tr>
                <th>E¬</th>
                <td>Elimination Negation</td>
                <td>δ¬¬ ⊢ δ</td>
                <td>
                  Choose 1 propositional whit main conective ¬¬ and clear it
                </td>
              </tr>
              <tr>
                <th>Hyp</th>
                <td>Hypothesis</td>
                <td> ⊢ δ</td>
                <td>Create a hypothesis in a new block</td>
              </tr>
              <tr>
                <th>Rep</th>
                <td>Repeat</td>
                <td>δ ⊢ δ</td>
                <td>Choose 1 propositional and Insert it to the last bloack</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
