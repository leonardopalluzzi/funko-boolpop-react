export default function CheckoutFormUi({ checkout, shipping, billing, onChangeUser, onChangeShipping, onChangeBilling, onsubmit, addressFlag, handleAddress }) {
    return (
        <>
            <div className="container">
                <form method="POST" onSubmit={(e) => { e.preventDefault(); onsubmit() }}>

                    {/* user info  */}

                    <div class="mb-3">
                        <label class="form-label">Name</label>
                        <input
                            value={checkout.username}
                            onChange={(e) => onChangeUser(e.target.name, e.target.value)}
                            type="text"
                            class="form-control"
                            name="username"
                            id=""
                            aria-describedby="helpId"
                            placeholder="Mario"
                            required
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Last Name</label>
                        <input
                            value={checkout.user_last_name}
                            onChange={(e) => onChangeUser(e.target.name, e.target.value)}
                            type="text"
                            class="form-control"
                            name="user_last_name"
                            id=""
                            aria-describedby="helpId"
                            placeholder="Rossi"
                            required
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input
                            value={checkout.useremail}
                            onChange={(e) => onChangeUser(e.target.name, e.target.value)}
                            type="email"
                            class="form-control"
                            name="useremail"
                            id=""
                            aria-describedby="helpId"
                            placeholder="mario@rossi.com"
                            required
                        />
                    </div>

                    <div className="container shipping_address">

                        {/* shipping info  */}

                        <h3>Shipping Address</h3>

                        <div className="row row-cols-1 row-cols-md-2">
                            <div className="col">
                                <div class="mb-3">
                                    <label class="form-label">City</label>
                                    <input
                                        value={shipping.city}
                                        onChange={(e) => onChangeShipping(e.target.name, e.target.value)}
                                        type="text"
                                        class="form-control"
                                        name="city"
                                        id=""
                                        aria-describedby="helpId"
                                        placeholder=""
                                        required
                                    />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Province</label>
                                    <input
                                        value={shipping.province}
                                        onChange={(e) => onChangeShipping(e.target.name, e.target.value)}
                                        type="text"
                                        class="form-control"
                                        name="province"
                                        id=""
                                        aria-describedby="helpId"
                                        placeholder=""
                                        required
                                    />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Nation</label>
                                    <input
                                        value={shipping.nation}
                                        onChange={(e) => onChangeShipping(e.target.name, e.target.value)}
                                        type="text"
                                        class="form-control"
                                        name="nation"
                                        id=""
                                        aria-describedby="helpId"
                                        placeholder=""
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div class="mb-3">
                                    <label class="form-label">Street</label>
                                    <input
                                        value={shipping.street}
                                        onChange={(e) => onChangeShipping(e.target.name, e.target.value)}
                                        type="text"
                                        class="form-control"
                                        name="street"
                                        id=""
                                        aria-describedby="helpId"
                                        placeholder=""
                                        required
                                    />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Civic</label>
                                    <input
                                        value={shipping.civic}
                                        onChange={(e) => onChangeShipping(e.target.name, e.target.value)}
                                        type="text"
                                        class="form-control"
                                        name="civic"
                                        id=""
                                        aria-describedby="helpId"
                                        placeholder=""
                                        required
                                    />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Cap</label>
                                    <input
                                        value={shipping.cap}
                                        onChange={(e) => onChangeShipping(e.target.name, e.target.value)}
                                        type="text"
                                        class="form-control"
                                        name="cap"
                                        id=""
                                        aria-describedby="helpId"
                                        placeholder=""
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="form-check">
                            <input onChange={addressFlag == false ? () => handleAddress(true) : () => handleAddress(false)} class="form-check-input" type="checkbox" value="" id="" />
                            <label class="form-check-label"> Billing Address different from Shipping Address </label>
                        </div>
                    </div>
                    {addressFlag == false ? (<></>) : (
                        <>
                            <div className="container billing_address">

                                {/* Billing info  */}

                                <h3>Billing Address</h3>

                                <div className="row row-cols-1 row-cols-md-2">
                                    <div className="col">
                                        <div class="mb-3">
                                            <label class="form-label">City</label>
                                            <input
                                                value={billing.billing_city}
                                                onChange={(e) => onChangeBilling(e.target.name, e.target.value)}
                                                type="text"
                                                class="form-control"
                                                name="billing_city"
                                                id=""
                                                aria-describedby="helpId"
                                                placeholder=""
                                                required
                                            />
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label">Province</label>
                                            <input
                                                value={billing.billing_province}
                                                onChange={(e) => onChangeBilling(e.target.name, e.target.value)}
                                                type="text"
                                                class="form-control"
                                                name="billing_province"
                                                id=""
                                                aria-describedby="helpId"
                                                placeholder=""
                                                required
                                            />
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label">Nation</label>
                                            <input
                                                value={billing.billing_nation}
                                                onChange={(e) => onChangeBilling(e.target.name, e.target.value)}
                                                type="text"
                                                class="form-control"
                                                name="billing_nation"
                                                id=""
                                                aria-describedby="helpId"
                                                placeholder=""
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div class="mb-3">
                                            <label class="form-label">Street</label>
                                            <input
                                                value={billing.billing_street}
                                                onChange={(e) => onChangeBilling(e.target.name, e.target.value)}
                                                type="text"
                                                class="form-control"
                                                name="billing_street"
                                                id=""
                                                aria-describedby="helpId"
                                                placeholder=""
                                                required
                                            />
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label">Civic</label>
                                            <input
                                                value={billing.billing_civic}
                                                onChange={(e) => onChangeBilling(e.target.name, e.target.value)}
                                                type="text"
                                                class="form-control"
                                                name="billing_civic"
                                                id=""
                                                aria-describedby="helpId"
                                                placeholder=""
                                                required
                                            />
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label">Cap</label>
                                            <input
                                                value={billing.billing_cap}
                                                onChange={(e) => onChangeBilling(e.target.name, e.target.value)}
                                                type="text"
                                                class="form-control"
                                                name="billing_cap"
                                                id=""
                                                aria-describedby="helpId"
                                                placeholder=""
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                    )}
                    <button type="submit" className="btn btn-primary">Proceed to payment</button>
                </form>
            </div>

        </>
    )
}